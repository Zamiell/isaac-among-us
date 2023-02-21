import { Task } from "common";
import { SoundEffect } from "isaac-typescript-definitions";
import {
  emptyArray,
  game,
  getEffects,
  getEnumValues,
  newReadonlyColor,
  sfxManager,
  shuffleArray,
} from "isaacscript-common";
import { ButtonSubType } from "../enums/ButtonSubType";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { spawnTaskButton } from "../features/buttonSpawn";
import { resetButton } from "../features/buttonSubroutines";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import { g } from "../globals";
import { movePlayerToGridIndex, spawnEntity } from "../utils";

const THIS_TASK = Task.SHORT_FIX_WIRES;
const NUM_BUTTONS = 4;
const WIRE_SIGN_OFFSET = Vector(-28, 0);

enum WireColor {
  YELLOW,
  BLUE,
  RED,
  MAGENTA,
}

const WIRE_COLORS = {
  [WireColor.YELLOW]: newReadonlyColor(1, 1, 0),
  [WireColor.BLUE]: newReadonlyColor(0, 0, 1),
  [WireColor.RED]: newReadonlyColor(1, 0, 0),
  [WireColor.MAGENTA]: newReadonlyColor(1, 0, 1),
} as const satisfies Record<WireColor, Readonly<Color>>;

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
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  const centerGridIndex = 52;
  movePlayerToGridIndex(centerGridIndex);

  const bottomGridIndex = 97;
  spawnTeleporter(bottomGridIndex);

  // The left side is always in the same order.
  const topLeftGridIndex = 16;
  for (let i = 0; i < NUM_BUTTONS; i++) {
    const gridIndex = topLeftGridIndex + i * gridWidth * 2;
    const button = spawnTaskButton(gridIndex, 1);
    const data = button.GetData();
    data["color"] = i;

    const sign = spawnEntity(EntityTypeCustom.WIRE_SIGN, 0, 0, gridIndex);
    const sprite = sign.GetSprite();
    sprite.Offset = WIRE_SIGN_OFFSET;
    sprite.SetFrame(i);
  }

  // The right side is randomized, with the color being stored as entity data.
  const topRightGridIndex = 28;
  const wireColors = getEnumValues(WireColor);
  const randomWireColors = shuffleArray(wireColors);
  for (let i = 0; i < NUM_BUTTONS; i++) {
    const color = randomWireColors[i];
    if (color === undefined) {
      error(`Failed to get the random wire color for index: ${i}`);
    }

    const gridIndex = topRightGridIndex + i * gridWidth * 2;
    const button = spawnTaskButton(gridIndex, 2);
    const data = button.GetData();
    data["color"] = color;

    const sign = spawnEntity(EntityTypeCustom.WIRE_SIGN, 0, 0, gridIndex);
    const sprite = sign.GetSprite();
    sprite.Offset = WIRE_SIGN_OFFSET.mul(-1);
    sprite.SetFrame(color);
  }

  buttonColorActive = null;
  emptyArray(colorsComplete);
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
  const color = data["color"] as WireColor;

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
    sfxManager.Play(SoundEffect.THUMBS_DOWN);
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

function resetLeftButtons(exceptColor: WireColor) {
  const leftButtons = getEffects(
    EffectVariantCustom.BUTTON,
    ButtonSubType.TASK_1,
  );
  for (const button of leftButtons) {
    const data = button.GetData();
    const color = data["color"] as WireColor;

    // Don't reset the button that we just pushed and don't reset the buttons that have already been
    // completed.
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
    sprite.Render(startPosition);
  }
}
