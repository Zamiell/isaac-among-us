import { arrayEmpty, arrayShuffle, getEnumValues } from "isaacscript-common";
import { ButtonSubType, EffectVariantCustom, EntityTypeCustom } from "../enums";
import { spawnTaskButton } from "../features/buttonSpawn";
import { resetButton } from "../features/buttonSubroutines";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { movePlayerToGridIndex, spawnEntity } from "../util";

const THIS_TASK = Task.SHORT_FIX_WIRES;
const NUM_BUTTONS = 4;
const WIRE_SIGN_OFFSET = Vector(-28, 0);

enum WireColor {
  YELLOW,
  BLUE,
  RED,
  MAGENTA,
}

type WireColors = {
  [Value in WireColor]: Color;
};

const WIRE_COLORS: WireColors = {
  [WireColor.YELLOW]: Color(1, 1, 0),
  [WireColor.BLUE]: Color(0, 0, 1),
  [WireColor.RED]: Color(1, 0, 0),
  [WireColor.MAGENTA]: Color(1, 0, 1),
};

let buttonColorActive: WireColor | null = null;
const colorsComplete: WireColor[] = [];

type LineSprites = {
  [Value in WireColor]: {
    startPosition: Vector | null;
    endPosition: Vector | null;
    sprite: Sprite;
    finished: boolean;
  };
};

const sfx = SFXManager();

const lineSprites: LineSprites = {
  [WireColor.YELLOW]: {
    startPosition: null,
    endPosition: null,
    sprite: Sprite(),
    finished: false,
  },
  [WireColor.BLUE]: {
    startPosition: null,
    endPosition: null,
    sprite: Sprite(),
    finished: false,
  },
  [WireColor.RED]: {
    startPosition: null,
    endPosition: null,
    sprite: Sprite(),
    finished: false,
  },
  [WireColor.MAGENTA]: {
    startPosition: null,
    endPosition: null,
    sprite: Sprite(),
    finished: false,
  },
};

for (const spriteDescription of Object.values(lineSprites)) {
  const { sprite } = spriteDescription;
  sprite.Load("gfx/electrical/line.anm2", true);
  sprite.SetFrame("Default", 0);
}

export function fixWires(): void {
  const game = Game();
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  const centerGridIndex = 52;
  movePlayerToGridIndex(centerGridIndex);
  updatePlayerStats();

  const bottomGridIndex = 97;
  spawnTeleporter(bottomGridIndex);

  // The left side is always in the same order
  const topLeftGridIndex = 16;
  for (let i = 0; i < NUM_BUTTONS; i++) {
    const gridIndex = topLeftGridIndex + i * gridWidth * 2;
    const button = spawnTaskButton(gridIndex, 1);
    const data = button.GetData();
    data.color = i;

    const sign = spawnEntity(EntityTypeCustom.WIRE_SIGN, 0, 0, gridIndex);
    const sprite = sign.GetSprite();
    sprite.Offset = WIRE_SIGN_OFFSET;
    sprite.SetFrame(i);
  }

  // The right side is randomized, with the color being stored as entity data
  const topRightGridIndex = 28;
  const wireColors = getEnumValues(WireColor);
  const randomWireColors = arrayShuffle(wireColors);
  for (let i = 0; i < NUM_BUTTONS; i++) {
    const color = randomWireColors[i];

    const gridIndex = topRightGridIndex + i * gridWidth * 2;
    const button = spawnTaskButton(gridIndex, 2);
    const data = button.GetData();
    data.color = color;

    const sign = spawnEntity(EntityTypeCustom.WIRE_SIGN, 0, 0, gridIndex);
    const sprite = sign.GetSprite();
    sprite.Offset = WIRE_SIGN_OFFSET.mul(-1);
    sprite.SetFrame(color);
  }

  buttonColorActive = null;
  arrayEmpty(colorsComplete);
  resetLineSprites();
}

function resetLineSprites() {
  for (const spriteDescription of Object.values(lineSprites)) {
    spriteDescription.startPosition = null;
    spriteDescription.endPosition = null;
    spriteDescription.finished = false;
  }
}

export function fixWiresButtonPressed(button: EntityEffect, num: int): void {
  const data = button.GetData();
  const color = data.color as WireColor;

  if (num === 1) {
    leftSideButtonPressed(color, button);
  } else {
    rightSideButtonPressed(color);
  }
}

function leftSideButtonPressed(color: WireColor, button: EntityEffect) {
  resetLeftButtons(color);

  buttonColorActive = color;

  const spriteDescription = lineSprites[buttonColorActive];
  spriteDescription.startPosition = Isaac.WorldToRenderPosition(
    button.Position,
  );
}

function rightSideButtonPressed(color: WireColor) {
  if (color !== buttonColorActive) {
    sfx.Play(SoundEffect.SOUND_THUMBS_DOWN);
    taskLeave();
    return;
  }

  const spriteDescription = lineSprites[buttonColorActive];
  spriteDescription.finished = true;

  colorsComplete.push(buttonColorActive);
  buttonColorActive = null;

  const allColors = getEnumValues(WireColor);
  if (colorsComplete.length === allColors.length) {
    taskComplete();
  }
}

function resetLeftButtons(exceptColor: int) {
  const buttons = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    EffectVariantCustom.BUTTON,
    ButtonSubType.TASK_1,
  );
  for (const button of buttons) {
    const data = button.GetData();
    const color = data.color as WireColor;

    // Don't reset the button that we just pushed
    // and don't reset the buttons that have already been completed
    if (color !== exceptColor && !colorsComplete.includes(color)) {
      resetButton(button);
    }
  }
}

export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const player = Isaac.GetPlayer();

  if (buttonColorActive !== null) {
    const spriteDescription = lineSprites[buttonColorActive];
    spriteDescription.endPosition = Isaac.WorldToRenderPosition(
      player.Position,
    );
  }

  for (const [colorString, spriteDescription] of Object.entries(lineSprites)) {
    const color = colorString as unknown as WireColor;
    const { startPosition, endPosition, sprite, finished } = spriteDescription;

    if (startPosition === null || endPosition === null) {
      continue;
    }

    if (color !== buttonColorActive && !finished) {
      continue;
    }

    const combinedVector = endPosition.sub(startPosition);
    sprite.Rotation = combinedVector.GetAngleDegrees();
    sprite.Scale = Vector(combinedVector.Length(), 1);
    sprite.Color = WIRE_COLORS[color];
    sprite.Render(startPosition, Vector.Zero, Vector.Zero);
  }
}
function updatePlayerStats() {
  throw new Error("Function not implemented.");
}
