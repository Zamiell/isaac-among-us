import { Task } from "common";
import { CollectibleType, SoundEffect } from "isaac-typescript-definitions";
import {
  emptyArray,
  game,
  getCollectibleName,
  getRandomArrayElement,
  getRandomArrayIndex,
  repeat,
  sfxManager,
} from "isaacscript-common";
import { spawnTaskButton } from "../features/buttonSpawn";
import { resetAllButtons } from "../features/buttonSubroutines";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { mod } from "../mod";
import { initGlowingItemSprite } from "../sprite";
import { drawFontText, movePlayerToGridIndex } from "../utils";

const THIS_TASK = Task.SHORT_IDENTIFY_COLLECTIBLES;
const NUM_ROUNDS = 5;
const STARTING_ROUND = 1;
const NUM_RANDOM_COLLECTIBLES = 5;
const BUTTON_SPACING = 2;
const BUTTON_1_GRID_INDEX = 48;
const ROW_LENGTH = 15;
const TEXT_GRID_INDEX = 86;

const collectibleSprites: Sprite[] = [];
let currentRound = STARTING_ROUND;
let currentCollectible = "";
let correctCollectibleIndex = 0;

export function identifyCollectibles(): void {
  const bottomLeftGridIndex = 92;
  spawnTeleporter(bottomLeftGridIndex);

  spawnButtons();

  currentRound = STARTING_ROUND;
  setupRound();
}

function spawnButtons() {
  let gridIndex = BUTTON_1_GRID_INDEX;
  for (let i = 0; i < NUM_RANDOM_COLLECTIBLES; i++) {
    spawnTaskButton(gridIndex, i + 1);
    gridIndex += BUTTON_SPACING;
  }
}

function setupRound() {
  const startGridIndex = 97;
  movePlayerToGridIndex(startGridIndex);

  const randomCollectibles = getRandomCollectibles();

  // Initialize the sprites.
  emptyArray(collectibleSprites);
  for (const randomCollectible of randomCollectibles) {
    const sprite = initGlowingItemSprite(randomCollectible);
    collectibleSprites.push(sprite);
  }

  // Randomly select one of the three items.
  const randomIndex = getRandomArrayIndex(randomCollectibles);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const randomCollectible = randomCollectibles[randomIndex]!;
  correctCollectibleIndex = randomIndex;
  currentCollectible = getCollectibleName(randomCollectible);

  resetAllButtons();
}

function getRandomCollectibles(): CollectibleType[] {
  const collectibleArray = mod.getCollectibleArray();

  const randomCollectibles: CollectibleType[] = [];
  repeat(NUM_RANDOM_COLLECTIBLES, () => {
    const randomCollectible = getRandomArrayElement(
      collectibleArray,
      undefined,
      randomCollectibles,
    );
    randomCollectibles.push(randomCollectible);
  });

  return randomCollectibles;
}

export function identifyCollectibleButtonPressed(num: int): void {
  if (num === correctCollectibleIndex + 1) {
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

  drawItemSprites();
  drawItemText();
}

function drawItemSprites() {
  const room = game.GetRoom();

  let buttonGridIndex = BUTTON_1_GRID_INDEX;
  for (let i = 0; i < NUM_RANDOM_COLLECTIBLES; i++) {
    const spriteGridIndex = buttonGridIndex - ROW_LENGTH;
    const gamePosition = room.GetGridPosition(spriteGridIndex);
    const position = Isaac.WorldToRenderPosition(gamePosition);
    const sprite = collectibleSprites[i];
    if (sprite !== undefined) {
      sprite.RenderLayer(0, position);
    }

    buttonGridIndex += BUTTON_SPACING;
  }
}

function drawItemText() {
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);
  const text = `Find: ${currentCollectible}`;
  drawFontText(text, position);
}
