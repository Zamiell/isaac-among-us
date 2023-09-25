import { Task } from "common";
import type { TrinketType } from "isaac-typescript-definitions";
import { SoundEffect } from "isaac-typescript-definitions";
import {
  VANILLA_TRINKET_TYPES,
  emptyArray,
  game,
  getRandomArrayElement,
  getRandomArrayIndex,
  getTrinketName,
  repeat,
  sfxManager,
} from "isaacscript-common";
import { spawnTaskButton } from "../features/buttonSpawn";
import { resetAllButtons } from "../features/buttonSubroutines";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import { g } from "../globals";
import { initGlowingItemSprite } from "../sprite";
import { drawFontText, movePlayerToGridIndex } from "../utils";

const THIS_TASK = Task.SHORT_IDENTIFY_TRINKETS;
const NUM_ROUNDS = 5;
const STARTING_ROUND = 1;
const NUM_RANDOM_TRINKETS = 5;
const BUTTON_SPACING = 2;
const BUTTON_1_GRID_INDEX = 48;
const ROW_LENGTH = 15;
const TEXT_GRID_INDEX = 86;

const trinketSprites: Sprite[] = [];
let currentTrinket = "";

let currentRound = STARTING_ROUND;
let correctTrinketIndex = 0;

export function identifyTrinkets(): void {
  const bottomLeftGridIndex = 92;
  spawnTeleporter(bottomLeftGridIndex);

  spawnButtons();

  currentRound = STARTING_ROUND;
  setupRound();
}

function spawnButtons() {
  let gridIndex = BUTTON_1_GRID_INDEX;
  for (let i = 0; i < NUM_RANDOM_TRINKETS; i++) {
    spawnTaskButton(gridIndex, i + 1);
    gridIndex += BUTTON_SPACING;
  }
}

function setupRound() {
  const startGridIndex = 97;
  movePlayerToGridIndex(startGridIndex);

  const randomTrinkets = getRandomTrinkets();

  // Initialize the sprites.
  emptyArray(trinketSprites);
  for (const randomTrinket of randomTrinkets) {
    const sprite = initGlowingItemSprite(randomTrinket, true);
    trinketSprites.push(sprite);
  }

  // Randomly select one of the three trinkets.
  const randomIndex = getRandomArrayIndex(randomTrinkets);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const randomTrinket = randomTrinkets[randomIndex]!;
  correctTrinketIndex = randomIndex;
  currentTrinket = getTrinketName(randomTrinket);

  resetAllButtons();
}

function getRandomTrinkets(): TrinketType[] {
  const randomTrinkets: TrinketType[] = [];
  repeat(NUM_RANDOM_TRINKETS, () => {
    const randomTrinket = getRandomArrayElement(
      VANILLA_TRINKET_TYPES,
      undefined,
      randomTrinkets,
    );
    randomTrinkets.push(randomTrinket);
  });

  return randomTrinkets;
}

export function identifyTrinketButtonPressed(num: int): void {
  if (num === correctTrinketIndex + 1) {
    correctSelection();
  } else {
    incorrectSelection();
  }
}

function correctSelection() {
  sfxManager.Play(SoundEffect.THUMBS_UP, 0.5);

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

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  drawTrinketSprites();
  drawTrinketText();
}

function drawTrinketSprites() {
  const room = game.GetRoom();

  let buttonGridIndex = BUTTON_1_GRID_INDEX;
  for (let i = 0; i < NUM_RANDOM_TRINKETS; i++) {
    const spriteGridIndex = buttonGridIndex - ROW_LENGTH;
    const gamePosition = room.GetGridPosition(spriteGridIndex);
    const position = Isaac.WorldToRenderPosition(gamePosition);
    const sprite = trinketSprites[i];
    if (sprite !== undefined) {
      sprite.RenderLayer(0, position);
    }

    buttonGridIndex += BUTTON_SPACING;
  }
}

function drawTrinketText() {
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);
  const text = `Find: ${currentTrinket}`;
  drawFontText(text, position);
}
