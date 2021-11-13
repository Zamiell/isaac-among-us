import {
  arrayEmpty,
  getCollectibleName,
  getCollectibleSet,
  getRandomArrayElement,
  getRandomArrayIndex,
} from "isaacscript-common";
import { spawnTaskButton } from "../features/buttonSpawn";
import { resetAllButtons } from "../features/buttonSubroutines";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { initGlowingItemSprite } from "../sprite";
import { Task } from "../types/Task";
import { drawFontText, movePlayerToGridIndex } from "../util";

const THIS_TASK = Task.SHORT_IDENTIFY_ITEMS;
const NUM_ROUNDS = 5;
const STARTING_ROUND = 1;
const NUM_RANDOM_ITEMS = 5;
const BUTTON_SPACING = 2;
const BUTTON_1_GRID_INDEX = 48;
const ROW_LENGTH = 15;
const TEXT_GRID_INDEX = 86;

const sfx = SFXManager();
const itemSprites: Sprite[] = [];
let currentRound = STARTING_ROUND;
let currentItem = "";
let correctItemIndex = 0;

export function identifyItems(): void {
  const bottomLeftGridIndex = 92;
  spawnTeleporter(bottomLeftGridIndex);

  spawnButtons();

  currentRound = STARTING_ROUND;
  setupRound();
}

function spawnButtons() {
  let gridIndex = BUTTON_1_GRID_INDEX;
  for (let i = 0; i < NUM_RANDOM_ITEMS; i++) {
    spawnTaskButton(gridIndex, i + 1);
    gridIndex += BUTTON_SPACING;
  }
}

function setupRound() {
  const startGridIndex = 97;
  movePlayerToGridIndex(startGridIndex);

  const randomItems = getRandomItems();

  // Initialize the sprites
  arrayEmpty(itemSprites);
  for (let i = 0; i < NUM_RANDOM_ITEMS; i++) {
    const randomItem = randomItems[i];
    const sprite = initGlowingItemSprite(randomItem);
    itemSprites.push(sprite);
  }

  // Randomly select one of the three items
  const randomIndex = getRandomArrayIndex(randomItems);
  const randomItem = randomItems[randomIndex];
  correctItemIndex = randomIndex;
  currentItem = getCollectibleName(randomItem);

  resetAllButtons();
}

function getRandomItems() {
  const collectibleSet = getCollectibleSet();
  const collectibleArray: CollectibleType[] = [];
  for (const collectibleType of collectibleSet.values()) {
    collectibleArray.push(collectibleType);
  }

  const randomItems: CollectibleType[] = [];
  while (randomItems.length < NUM_RANDOM_ITEMS) {
    const randomItem = getRandomArrayElement(collectibleArray);
    if (!randomItems.includes(randomItem)) {
      randomItems.push(randomItem);
    }
  }

  return randomItems;
}

export function identifyItemButtonPressed(num: int): void {
  Isaac.DebugString(`correctItemIndex: ${correctItemIndex}`);
  if (num === correctItemIndex + 1) {
    correctSelection();
  } else {
    incorrectSelection();
  }
}

function correctSelection() {
  sfx.Play(SoundEffect.SOUND_THUMBSUP, 0.5);

  currentRound += 1;
  if (currentRound >= NUM_ROUNDS) {
    taskComplete();
  } else {
    setupRound();
  }
}

function incorrectSelection() {
  sfx.Play(SoundEffect.SOUND_THUMBS_DOWN);
  taskLeave();
}

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  drawItemSprites();
  drawItemText();
}

function drawItemSprites() {
  const game = Game();
  const room = game.GetRoom();

  let buttonGridIndex = BUTTON_1_GRID_INDEX;
  for (let i = 0; i < NUM_RANDOM_ITEMS; i++) {
    const spriteGridIndex = buttonGridIndex - ROW_LENGTH;
    const gamePosition = room.GetGridPosition(spriteGridIndex);
    const position = Isaac.WorldToRenderPosition(gamePosition);
    const sprite = itemSprites[i];
    if (sprite !== undefined) {
      sprite.RenderLayer(0, position);
    }

    buttonGridIndex += BUTTON_SPACING;
  }
}

function drawItemText() {
  const game = Game();
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);
  const text = `Find: ${currentItem}`;
  drawFontText(text, position);
}
