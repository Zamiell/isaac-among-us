import {
  emptyArray,
  getRandomArrayElement,
  getRandomArrayIndex,
  getTrinketName,
  getTrinketSet,
  sfxManager,
} from "isaacscript-common";
import { spawnTaskButton } from "../features/buttonSpawn";
import { resetAllButtons } from "../features/buttonSubroutines";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { initGlowingItemSprite } from "../sprite";
import { Task } from "../types/Task";
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

  // Initialize the sprites
  emptyArray(trinketSprites);
  for (let i = 0; i < NUM_RANDOM_TRINKETS; i++) {
    const randomTrinket = randomTrinkets[i];
    const sprite = initGlowingItemSprite(randomTrinket, true);
    trinketSprites.push(sprite);
  }

  // Randomly select one of the three trinkets
  const randomIndex = getRandomArrayIndex(randomTrinkets);
  const randomTrinket = randomTrinkets[randomIndex];
  correctTrinketIndex = randomIndex;
  currentTrinket = getTrinketName(randomTrinket);

  resetAllButtons();
}

function getRandomTrinkets() {
  const trinketSet = getTrinketSet();
  const trinketArray: TrinketType[] = [];
  for (const trinketType of trinketSet.values()) {
    trinketArray.push(trinketType);
  }

  const randomTrinkets: TrinketType[] = [];
  while (randomTrinkets.length < NUM_RANDOM_TRINKETS) {
    const randomTrinket = getRandomArrayElement(trinketArray);
    if (!randomTrinkets.includes(randomTrinket)) {
      randomTrinkets.push(randomTrinket);
    }
  }

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
  sfxManager.Play(SoundEffect.SOUND_THUMBSUP, 0.5);

  currentRound += 1;
  if (currentRound >= NUM_ROUNDS) {
    taskComplete();
  } else {
    setupRound();
  }
}

function incorrectSelection() {
  sfxManager.Play(SoundEffect.SOUND_THUMBS_DOWN);
  taskLeave();
}

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  drawTrinketSprites();
  drawTrinketText();
}

function drawTrinketSprites() {
  const game = Game();
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
  const game = Game();
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);
  const text = `Find: ${currentTrinket}`;
  drawFontText(text, position);
}
