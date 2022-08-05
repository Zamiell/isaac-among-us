import { EntityType, SoundEffect } from "isaac-typescript-definitions";
import {
  emptyArray,
  GAME_FRAMES_PER_SECOND,
  getEnumValues,
  getRandomEnumValue,
  removeAllMatchingEntities,
  repeat,
  runInNGameFrames,
  sfxManager,
} from "isaacscript-common";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import { spawnTaskButton } from "../features/buttonSpawn";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import { drawFontText, movePlayerToGridIndex } from "../utils";

const THIS_TASK = Task.LONG_IDENTIFY_PICKUPS_IN_ORDER;
const STARTING_ROUND = 1;
const NUM_ROUNDS = 6;
const PLAYER_START_GRID_INDEX = 82;
const TEXT_GRID_INDEX = 37; // Below the room description
const TEXT_SHOW_FRAMES = 30;
const BUTTON_GRID_INDEXES: readonly int[] = [
  32, 62, 92, 42, 72, 102, 35, 37, 39,
];
const ROW_LENGTH = 15;
const SPRITE_OFFSET = Vector(0, 10);

enum PickupType {
  HEART,
  COIN,
  BOMB,
  KEY,
  PILL,
  CARD,
  CHEST,
  SACK,
  BATTERY,
}

type PickupDescriptions = {
  [Value in PickupType]: {
    name: string;
    gfx: string;
  };
};

const pickupDescriptions: PickupDescriptions = {
  [PickupType.HEART]: {
    name: "Heart",
    gfx: "gfx/005.011_heart.anm2",
  },
  [PickupType.COIN]: {
    name: "Coin",
    gfx: "gfx/005.021_penny.anm2",
  },
  [PickupType.BOMB]: {
    name: "Bomb",
    gfx: "gfx/005.041_bomb.anm2",
  },
  [PickupType.KEY]: {
    name: "Key",
    gfx: "gfx/005.031_key.anm2",
  },
  [PickupType.PILL]: {
    name: "Pill",
    gfx: "gfx/005.071_pill blue-blue.anm2",
  },
  [PickupType.CARD]: {
    name: "Card",
    gfx: "gfx/005.301_tarot card.anm2",
  },
  [PickupType.CHEST]: {
    name: "Chest",
    gfx: "gfx/005.050_chest.anm2",
  },
  [PickupType.SACK]: {
    name: "Sack",
    gfx: "gfx/005.069_grabbag.anm2", // cspell:disable-line
  },
  [PickupType.BATTERY]: {
    name: "Battery",
    gfx: "gfx/005.090_littlebattery.anm2", // cspell:disable-line
  },
};

let currentRound = STARTING_ROUND;
let showingPickupIndex: int | null = null;
let showingPickupRenderFrame: int | null = null;
const pickupSprites: Sprite[] = [];
const currentPickupOrder: PickupType[] = [];
let currentChoosingIndex = 0;

for (let i = 0; i < getEnumValues(PickupType).length; i++) {
  const pickupDescription = pickupDescriptions[i as PickupType];

  const sprite = Sprite();
  sprite.Load(pickupDescription.gfx, true);
  sprite.SetFrame("Idle", 0);

  pickupSprites.push(sprite);
}

export function identifyPickupsInOrder(): void {
  const bottomGridIndex = 112;
  spawnTeleporter(bottomGridIndex);

  currentRound = STARTING_ROUND;
  setupRound();
}

function setupRound() {
  movePlayerToGridIndex(PLAYER_START_GRID_INDEX);

  removeAllMatchingEntities(EntityType.EFFECT, EffectVariantCustom.BUTTON);

  emptyArray(currentPickupOrder);
  repeat(currentRound, () => {
    const randomPickupType = getRandomEnumValue(
      PickupType,
      undefined,
      currentPickupOrder,
    );
    currentPickupOrder.push(randomPickupType);
  });

  // Delay a second so that the player gets a chance to react before seeing the text.
  showingPickupIndex = 0;
  runInNGameFrames(() => {
    showingPickupRenderFrame = Isaac.GetFrameCount();
  }, GAME_FRAMES_PER_SECOND / 2);
}

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  drawPickupText();
  drawPickupSprites();
}

function drawPickupText() {
  if (showingPickupIndex === null || showingPickupRenderFrame === null) {
    return;
  }

  const isaacFrameCount = Isaac.GetFrameCount();
  if (isaacFrameCount >= showingPickupRenderFrame + TEXT_SHOW_FRAMES) {
    showingPickupIndex++;
    showingPickupRenderFrame = isaacFrameCount;

    if (showingPickupIndex >= currentPickupOrder.length) {
      showingPickupIndex = null;
      showingPickupRenderFrame = null;
      currentChoosingIndex = 0;
      spawnButtons();
      return;
    }
  }

  const game = Game();
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const pickupType = currentPickupOrder[showingPickupIndex]!;
  const pickupDescription = pickupDescriptions[pickupType];
  const text = pickupDescription.name;
  drawFontText(text, position);
}

function drawPickupSprites() {
  if (showingPickupIndex !== null || showingPickupRenderFrame !== null) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();

  for (let i = 0; i < BUTTON_GRID_INDEXES.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const buttonGridIndex = BUTTON_GRID_INDEXES[i]!;
    const spriteGridIndex = buttonGridIndex - ROW_LENGTH;
    const gamePosition = room.GetGridPosition(spriteGridIndex);
    const renderPosition = Isaac.WorldToRenderPosition(gamePosition);
    const position = renderPosition.add(SPRITE_OFFSET);
    const sprite = pickupSprites[i];
    if (sprite !== undefined) {
      sprite.RenderLayer(0, position);
    }
  }
}

function spawnButtons() {
  const pickupTypes = getEnumValues(PickupType);
  for (let i = 0; i < pickupTypes.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const gridIndex = BUTTON_GRID_INDEXES[i]!;
    const button = spawnTaskButton(gridIndex, 1);
    const data = button.GetData();
    data["pickupType"] = pickupTypes[i];
  }
}

export function identifyPickupsInOrderButtonPressed(
  button: EntityEffect,
): void {
  const data = button.GetData();
  const { pickupType } = data;
  if (pickupType === undefined) {
    return;
  }

  const correctPickupType = currentPickupOrder[currentChoosingIndex];
  if (correctPickupType === pickupType) {
    correctSelection();
  } else {
    incorrectSelection();
  }
}

function correctSelection() {
  sfxManager.Play(SoundEffect.THUMBS_UP, 0.5);

  currentChoosingIndex++;
  if (currentChoosingIndex >= currentPickupOrder.length) {
    nextRound();
  } else {
    movePlayerToGridIndex(PLAYER_START_GRID_INDEX);
  }
}

function nextRound() {
  currentRound++;
  if (currentRound >= NUM_ROUNDS) {
    taskComplete();
  } else {
    setupRound();
  }
}

function incorrectSelection() {
  sfxManager.Play(SoundEffect.THUMBS_DOWN);
  taskLeave();
}
