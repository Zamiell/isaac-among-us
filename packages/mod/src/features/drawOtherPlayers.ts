// Multiplayer players are represented by custom effects with a variant of
// `EffectVariantCustom.MULTIPLAYER_PLAYER`. We don't use a real player (entity 1.0) since the
// sprite is not mutable (it resets on every render frame).

import { EntityType } from "isaac-typescript-definitions";
import {
  asNumber,
  RENDER_FRAMES_PER_SECOND,
  VectorZero,
} from "isaacscript-common";
import { injectTestPlayers } from "../debug";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import { fonts } from "../fonts";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { inEndMeeting, inStartMeeting } from "../utils";
import { isConsoleOpen } from "./console";
import { getMeetingCirclePoints } from "./setupMeeting";
import { inTask } from "./task";

const MULTIPLAYER_ANM2_PREFIX = "gfx/multiplayer/";
const MULTIPLAYER_ANM2_SUFFIX = ".anm2";
const USERNAME_TEXT_OFFSET = Vector(0, -50);
const USERNAME_FADE = 0.75;
const USERNAME_FADE_DEATH = 0.25;
const DEATH_SPRITE_OFFSET = Vector(-20, -10);
const DEATH_ANIMATION_FINAL_FRAME = 55;

const NO_USERNAME_ANIMATIONS: ReadonlySet<string> = new Set(["Trapdoor"]);

/** Indexed by user ID. */
const playerEffectMap = new Map<int, EntityRef>();

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null) {
    return;
  }

  if (inTask()) {
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
  const room = getSkeldRoom();
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
      // Don't draw stale players, since they might have disconnected.
      renderFramesSinceLastUpdate > RENDER_FRAMES_PER_SECOND ||
      // Don't draw players who are not in this room.
      playerData.room !== room ||
      // Don't draw dead players.
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

    if (!NO_USERNAME_ANIMATIONS.has(playerData.animation)) {
      drawUsername(playerData.userID, position);
    }
  }
}

function drawOtherPlayersBodies() {
  if (g.game === null || g.game.meeting !== null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  const room = getSkeldRoom();

  for (const body of g.game.bodies) {
    if (body.room !== room) {
      continue;
    }

    const entity = getMultiplayerEntity(body.userID);
    entity.Visible = true;

    setPlayerCharacter(entity, body.userID);

    let deathFrame = DEATH_ANIMATION_FINAL_FRAME;
    if (body.renderFrameKilled !== undefined) {
      // We divide it by two to slow it down.
      deathFrame = Math.floor((isaacFrameCount - body.renderFrameKilled) / 2);
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const player = g.game.players[i]!;

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

  // We want to draw the usernames last so that they take precedence over the player sprites.
  for (let i = 0; i < g.game.players.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const player = g.game.players[i]!;
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

  if (entityRef === undefined || entityRef.Entity === undefined) {
    // The player entity does not exist in the map or the existing entity reference is no longer
    // valid.
    const playerEffect = spawnPlayerEffect();
    entityRef = EntityRef(playerEffect);
    playerEffectMap.set(userID, entityRef);
  }

  if (entityRef.Entity === undefined) {
    error("Failed to get a multiplayer entity.");
  }

  return entityRef.Entity;
}

function spawnPlayerEffect(): EntityEffect {
  const playerEffect = Isaac.Spawn(
    EntityType.EFFECT,
    EffectVariantCustom.MULTIPLAYER_PLAYER,
    0,
    VectorZero,
    VectorZero,
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
  if (correctCharacter === undefined) {
    error(`Failed to get the character for player: ${userID}`);
  }

  if (character === asNumber(correctCharacter)) {
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

  // `overlayAnimation` cannot be null since a blank string is sent over the wire.
  if (overlayAnimation === "") {
    sprite.RemoveOverlay();
  } else {
    sprite.SetOverlayFrame(overlayAnimation, overlayAnimationFrame);
  }

  if (animation === "Death" && g.game !== null && g.game.meeting !== null) {
    // Having a sprite offset looks stupid when the death animation first occurs, so we only want it
    // to happen in the meeting.
    sprite.Offset = DEATH_SPRITE_OFFSET;
  } else {
    sprite.Offset = VectorZero;
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

  const red = g.game.imposterUserIDs.includes(userID);
  const { username } = player;

  const positionSprite = Isaac.WorldToScreen(positionGame);
  // Show the username of the player above the sprite.
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

/**
 * At the end of a meeting, we need to make the multiplayer entity that corresponds to our player
 * invisible.
 */
export function setSelfMultiplayerEntityInvisible(): void {
  if (g.userID === null) {
    return;
  }

  const entityRef = playerEffectMap.get(g.userID);
  if (entityRef === undefined || entityRef.Entity === undefined) {
    return;
  }

  entityRef.Entity.Visible = false;
}
