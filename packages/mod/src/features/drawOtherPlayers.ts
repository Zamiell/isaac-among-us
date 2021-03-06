// Multiplayer players are represented by custom effects with a variant of
// EffectVariantCustom.MULTIPLAYER_PLAYER
// We don't use a real player (entity 1.0) since the sprite is not mutable
// (it resets on every render frame)

import { ISAAC_FRAMES_PER_SECOND } from "isaacscript-common";
import { injectTestPlayers } from "../debugFunction";
import { EffectVariantCustom } from "../enums";
import { fonts } from "../fonts";
import g from "../globals";
import { getRoomIndexModified } from "../utils";
import { isConsoleOpen } from "./console";
import { inEndMeeting } from "./endMeeting";
import { getMeetingCirclePoints } from "./setupMeeting";
import { inStartMeeting } from "./startMeeting";

const MULTIPLAYER_ANM2_PREFIX = "gfx/multiplayer/";
const MULTIPLAYER_ANM2_SUFFIX = ".anm2";
const USERNAME_TEXT_OFFSET = Vector(0, -50);
const USERNAME_FADE = 0.75;
const USERNAME_FADE_DEATH = 0.25;
const DEATH_SPRITE_OFFSET = Vector(-20, -10);
const DEATH_ANIMATION_FINAL_FRAME = 55;

/** Indexed by user ID. */
const playerEffectMap = new Map<int, EntityRef>();

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null) {
    return;
  }

  drawOtherPlayersFromUDP();
  drawOtherPlayersBodies();
  drawOtherPlayersMeeting();
}

function drawOtherPlayersFromUDP() {
  if (g.game === null || g.game.meeting !== null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const roomIndex = getRoomIndexModified();
  const userIDsInOurGame = g.game.players.map((player) => player.userID);
  const userIDsInOurGameSet = new Set(userIDsInOurGame);

  for (const playerData of g.game.playerMap.values()) {
    const entity = getMultiplayerEntity(playerData.userID);
    entity.Visible = false;

    if (!userIDsInOurGameSet.has(playerData.userID)) {
      g.game.playerMap.delete(playerData.userID);
      continue;
    }

    const renderFramesSinceLastUpdate =
      isaacFrameCount - playerData.renderFrameUpdated;
    const player = g.game.getPlayerFromUserID(playerData.userID);
    if (
      // Don't draw stale players, since they might have disconnected
      renderFramesSinceLastUpdate > ISAAC_FRAMES_PER_SECOND ||
      // Don't draw players who are not in this room
      playerData.roomIndex !== roomIndex ||
      // Don't draw dead players
      player === undefined ||
      !player.alive
    ) {
      continue;
    }

    entity.Visible = true;

    setPlayerCharacter(entity, playerData.userID);
    setMultiplayerAnimation(
      entity,
      playerData.animation,
      playerData.animationFrame,
      playerData.overlayAnimation,
      playerData.overlayAnimationFrame,
    );

    const position = Vector(playerData.x, playerData.y);
    entity.Position = position;

    drawUsername(playerData.userID, position);
  }
}

function drawOtherPlayersBodies() {
  if (g.game === null || g.game.meeting !== null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();

  for (const body of g.game.bodies) {
    const entity = getMultiplayerEntity(body.userID);
    entity.Visible = true;

    setPlayerCharacter(entity, body.userID);

    let deathFrame = DEATH_ANIMATION_FINAL_FRAME;
    if (body.renderFrameKilled !== undefined) {
      deathFrame = isaacFrameCount - body.renderFrameKilled;
    }

    if (deathFrame < 0 || deathFrame > DEATH_ANIMATION_FINAL_FRAME) {
      deathFrame = DEATH_ANIMATION_FINAL_FRAME;
    }

    setMultiplayerAnimation(entity, "Death", deathFrame, "", 0);

    const position = Vector(body.x, body.y);
    entity.Position = position;

    drawUsername(body.userID, position);
  }
}

function drawOtherPlayersMeeting() {
  if (
    g.game === null ||
    g.game.meeting === null ||
    inStartMeeting() ||
    inEndMeeting()
  ) {
    return;
  }

  const circlePoints = getMeetingCirclePoints();

  injectTestPlayers();
  for (let i = 0; i < g.game.players.length; i++) {
    const player = g.game.players[i];

    const entity = getMultiplayerEntity(player.userID);
    entity.Visible = true;

    setPlayerCharacter(entity, player.userID);
    if (player.alive) {
      setMultiplayerAnimation(entity, "WalkDown", 0, "HeadDown", 0);
    } else {
      setMultiplayerAnimation(
        entity,
        "Death",
        DEATH_ANIMATION_FINAL_FRAME,
        "",
        0,
      );
    }

    const position = circlePoints[i];
    if (position !== undefined) {
      entity.Position = position;
    }
  }

  // We want to draw the usernames last so that they take precedence over the player sprites
  for (let i = 0; i < g.game.players.length; i++) {
    const player = g.game.players[i];
    const position = circlePoints[i];
    if (position !== undefined) {
      const opacity = player.alive ? undefined : USERNAME_FADE_DEATH;
      drawUsername(player.userID, position, opacity);
    }
  }
}

/** This function will spawn a new entity if one does not already exist for the provided user ID. */
function getMultiplayerEntity(userID: int): Entity {
  let entityRef = playerEffectMap.get(userID);
  if (entityRef !== undefined) {
    const entity = entityRef.Entity;
    if (entity === undefined || !entity.Exists()) {
      entityRef = undefined;
    }
  }

  if (entityRef === undefined) {
    // The player entity does not exist in the map or the existing entity reference is no longer
    // valid
    const playerEffect = spawnPlayerEffect();
    entityRef = EntityRef(playerEffect);
    playerEffectMap.set(userID, entityRef);
  }

  return entityRef.Entity;
}

export function spawnPlayerEffect(): EntityEffect {
  const playerEffect = Isaac.Spawn(
    EntityType.ENTITY_EFFECT,
    EffectVariantCustom.MULTIPLAYER_PLAYER,
    0,
    Vector.Zero,
    Vector.Zero,
    undefined,
  ).ToEffect();

  if (playerEffect === undefined) {
    error("Failed to spawn a player effect entity.");
  }

  return playerEffect;
}

function setPlayerCharacter(entity: Entity, userID: int) {
  if (g.game === null) {
    return;
  }

  const sprite = entity.GetSprite();
  const gfx = sprite.GetFilename();
  const anm2 = gfx.slice(MULTIPLAYER_ANM2_PREFIX.length);
  const characterString = anm2.slice(0, MULTIPLAYER_ANM2_SUFFIX.length * -1);
  const character = tonumber(characterString);
  if (character === undefined) {
    error(
      "Failed to parse the name of the anm2 file to derive the character number.",
    );
  }

  const correctCharacter = g.game.getPlayerCharacter(userID);
  if (correctCharacter === null) {
    error(`Failed to get the character for player: ${userID}`);
  }

  if (character === correctCharacter) {
    return;
  }

  const newAnm2 = `${MULTIPLAYER_ANM2_PREFIX}${correctCharacter}${MULTIPLAYER_ANM2_SUFFIX}`;
  sprite.Load(newAnm2, true);
}

function setMultiplayerAnimation(
  entity: Entity,
  animation: string,
  animationFrame: int,
  overlayAnimation: string,
  overlayAnimationFrame: int,
) {
  const sprite = entity.GetSprite();
  sprite.SetFrame(animation, animationFrame);

  // overlayAnimation cannot be null since a blank string is sent over the wire
  if (overlayAnimation === "") {
    sprite.RemoveOverlay();
  } else {
    sprite.SetOverlayFrame(overlayAnimation, overlayAnimationFrame);
  }

  if (animation === "Death") {
    sprite.Offset = DEATH_SPRITE_OFFSET;
  } else {
    sprite.Offset = Vector.Zero;
  }
}

export function drawUsername(
  userID: int,
  positionGame: Vector,
  opacity = USERNAME_FADE,
): void {
  if (g.game === null || isConsoleOpen()) {
    return;
  }

  const player = g.game.getPlayerFromUserID(userID);
  if (player === undefined) {
    return;
  }

  const red = g.game.imposters !== null && g.game.imposters.includes(userID);
  const { username } = player;

  const positionSprite = Isaac.WorldToScreen(positionGame);
  // Show the username of the player above the sprite
  const position = positionSprite.add(USERNAME_TEXT_OFFSET);
  const color = red ? KColor(1, 0, 0, opacity) : KColor(1, 1, 1, opacity);
  const scale = 1;
  const length = fonts.pf.GetStringWidthUTF8(username) * scale;
  fonts.pf.DrawStringScaled(
    username,
    position.X - length / 2,
    position.Y,
    scale,
    scale,
    color,
    0,
    true,
  );
}
