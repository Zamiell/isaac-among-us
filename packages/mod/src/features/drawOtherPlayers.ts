import { getRoomIndex, ISAAC_FRAMES_PER_SECOND } from "isaacscript-common";
import {
  CHARACTER_COSTUME_PNG_MAP,
  CHARACTER_COSTUME_PREFIX,
  CHARACTER_PNG_MAP,
  CHARACTER_PNG_PREFIX,
  DEFAULT_CHARACTER_COSTUME,
  DEFAULT_CHARACTER_PNG,
} from "../characters";
import { LOBBY_ROOM_INDEX } from "../constants";
import { injectTestPlayers } from "../debugFunction";
import { fonts } from "../fonts";
import g from "../globals";
import { getPlayerCharacter, getPlayerUsername } from "../players";
import { isConsoleOpen } from "./console";
import { inEndMeeting } from "./endMeeting";
import { getMeetingCirclePoints } from "./setupMeeting";
import { inStartMeeting } from "./startMeeting";

const USERNAME_TEXT_OFFSET = Vector(0, -50);
const USERNAME_FADE = 0.75;
const USERNAME_FADE_DEATH = 0.25;
const CHARACTER_LAYER_ID = 0;
const DEATH_SPRITE_OFFSET = Vector(-20, -10);
const DEATH_COSTUME_OFFSET = Vector(-14, -15);
const DEATH_ANIMATION_FINAL_FRAME = 55;

/** Indexed by user ID. */
const spriteMap = new Map<int, Sprite>();
const spriteCostumeMap = new Map<int, Sprite>();
const spriteCharacterMap = new Map<int, PlayerType>();

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null) {
    return;
  }

  drawOtherPlayersFromUDP();
  drawOtherPlayersMeeting();
}

function drawOtherPlayersFromUDP() {
  if (g.game === null || g.game.meeting !== null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  let roomIndex = getRoomIndex();
  if (roomIndex === GridRooms.ROOM_DEBUG_IDX) {
    roomIndex = LOBBY_ROOM_INDEX;
  }

  for (const playerData of g.game.playerMap.values()) {
    const framesSinceLastUpdate = isaacFrameCount - playerData.frameUpdated;
    if (framesSinceLastUpdate > 1 * ISAAC_FRAMES_PER_SECOND) {
      // Don't draw stale players, since they might have disconnected
      continue;
    }

    if (playerData.roomIndex !== roomIndex) {
      continue;
    }

    const [mainSprite, costumeSprite] = getPlayerSprites(playerData.userID);
    setSpriteCharacter(mainSprite, costumeSprite, playerData.userID);

    setSpriteAnimation(
      mainSprite,
      costumeSprite,
      playerData.animation,
      playerData.animationFrame,
      playerData.overlayAnimation,
      playerData.overlayAnimationFrame,
    );
    const position = Vector(playerData.x, playerData.y);
    drawSprites(mainSprite, undefined, position);
    const username = getPlayerUsername(playerData.userID, g.game.players);
    drawUsername(position, username);
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
    const [mainSprite, costumeSprite] = getPlayerSprites(player.userID);
    setSpriteCharacter(mainSprite, costumeSprite, player.userID);
    if (player.alive) {
      setSpriteAnimation(
        mainSprite,
        costumeSprite,
        "WalkDown",
        0,
        "HeadDown",
        0,
      );
    } else {
      setSpriteAnimation(
        mainSprite,
        costumeSprite,
        "Death",
        DEATH_ANIMATION_FINAL_FRAME,
        "",
        0,
      );
    }

    const position = circlePoints[i];
    if (position !== undefined) {
      drawSprites(mainSprite, costumeSprite, position);
    }
  }

  // We want to draw the usernames last so that they take precedence over the player sprites
  for (let i = 0; i < g.game.players.length; i++) {
    const player = g.game.players[i];
    const position = circlePoints[i];
    if (position !== undefined) {
      const opacity = player.alive ? undefined : USERNAME_FADE_DEATH;
      const isImpostor =
        g.game.imposters !== null && g.game.imposters.includes(player.userID);
      drawUsername(position, player.username, opacity, isImpostor);
    }
  }
}

function getPlayerSprites(userID: int) {
  let mainSprite = spriteMap.get(userID);
  if (mainSprite === undefined) {
    mainSprite = Sprite();
    mainSprite.Load("gfx/001.000_Player.anm2", true);
    spriteMap.set(userID, mainSprite);
  }

  let costumeSprite = spriteCostumeMap.get(userID);
  if (costumeSprite === undefined) {
    costumeSprite = Sprite();
    const defaultCharacterCostume =
      CHARACTER_COSTUME_PREFIX + DEFAULT_CHARACTER_COSTUME;
    costumeSprite.Load(defaultCharacterCostume, true);
    spriteCostumeMap.set(userID, costumeSprite);
  }

  return [mainSprite, costumeSprite];
}

function setSpriteCharacter(
  mainSprite: Sprite,
  costumeSprite: Sprite,
  userID: int,
) {
  if (g.game === null) {
    return;
  }

  let spriteCharacter = spriteCharacterMap.get(userID);
  if (spriteCharacter === undefined) {
    spriteCharacter = -1;
  }

  const character = getPlayerCharacter(userID, g.game.players);
  if (spriteCharacter === character) {
    return;
  }

  spriteCharacterMap.set(userID, character);

  let characterPNG = CHARACTER_PNG_MAP.get(character);
  if (characterPNG === undefined) {
    characterPNG = DEFAULT_CHARACTER_PNG;
  }

  const characterSpritePath = CHARACTER_PNG_PREFIX + characterPNG;
  mainSprite.ReplaceSpritesheet(CHARACTER_LAYER_ID, characterSpritePath);
  mainSprite.LoadGraphics();

  let characterCostume = CHARACTER_COSTUME_PNG_MAP.get(character);
  if (characterCostume === undefined) {
    characterCostume = DEFAULT_CHARACTER_COSTUME;
  }

  const characterCostumePath = CHARACTER_COSTUME_PREFIX + characterCostume;
  costumeSprite.Load(characterCostumePath, true);
}

function setSpriteAnimation(
  mainSprite: Sprite,
  costumeSprite: Sprite,
  animation: string,
  animationFrame: int,
  overlayAnimation: string,
  overlayAnimationFrame: int,
) {
  mainSprite.SetFrame(animation, animationFrame);

  // overlayAnimation cannot be null since a blank string is sent over the wire
  if (overlayAnimation === "") {
    mainSprite.RemoveOverlay();
  } else {
    mainSprite.SetOverlayFrame(overlayAnimation, overlayAnimationFrame);
  }

  if (animation === "Death") {
    mainSprite.Offset = DEATH_SPRITE_OFFSET;
    costumeSprite.Offset = DEATH_COSTUME_OFFSET;
    costumeSprite.SetFrame("HeadDown", 0);
    costumeSprite.Rotation = 90;
  } else {
    mainSprite.Offset = Vector.Zero;
    costumeSprite.Offset = Vector.Zero;
    costumeSprite.SetFrame(overlayAnimation, overlayAnimationFrame);
    costumeSprite.Rotation = 0;
  }
}

function drawSprites(
  mainSprite: Sprite,
  costumeSprite: Sprite | undefined,
  positionGame: Vector,
) {
  const position = Isaac.WorldToScreen(positionGame);
  mainSprite.Render(position, Vector.Zero, Vector.Zero);
  if (costumeSprite !== undefined) {
    costumeSprite.Render(position, Vector.Zero, Vector.Zero);
  }
}

export function drawUsername(
  positionGame: Vector,
  username: string,
  opacity = USERNAME_FADE,
  red = false,
): void {
  if (isConsoleOpen()) {
    return;
  }

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
