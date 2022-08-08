import { Task } from "common";
import { SoundEffect } from "isaac-typescript-definitions";
import {
  emptyArray,
  sfxManager,
  shuffleArrayInPlace,
} from "isaacscript-common";
import { spawnTaskButton } from "../features/buttonSpawn";
import { taskComplete, taskLeave } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { drawFontText, movePlayerToGridIndex } from "../utils";

const THIS_TASK = Task.SHORT_PUSH_BUTTONS_IN_ORDER;
const BUTTON_GRID_INDEXES: int[] = [32, 35, 39, 42, 62, 65, 69, 72, 92, 102];

const buttonOrder: int[] = [];
let nextButtonToPress = 0;

export function pushButtonsInOrder(): void {
  const centerGridIndex = 67;
  movePlayerToGridIndex(centerGridIndex);

  const bottomGridIndex = 112;
  spawnTeleporter(bottomGridIndex);

  setNewButtonOrder();
  spawnButtons();
}

function setNewButtonOrder() {
  emptyArray(buttonOrder);
  for (let i = 0; i < BUTTON_GRID_INDEXES.length; i++) {
    buttonOrder.push(i);
  }
  shuffleArrayInPlace(buttonOrder);

  nextButtonToPress = 0;
}

function spawnButtons() {
  for (let i = 0; i < BUTTON_GRID_INDEXES.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const gridIndex = BUTTON_GRID_INDEXES[i]!;
    const button = spawnTaskButton(gridIndex, 1);
    const data = button.GetData();
    data["num"] = buttonOrder[i];
  }
}

export function pushButtonsInOrderButtonPressed(button: EntityEffect): void {
  const data = button.GetData();
  const { num } = data;
  if (num === undefined) {
    return;
  }

  if (num !== nextButtonToPress) {
    sfxManager.Play(SoundEffect.THUMBS_DOWN);
    taskLeave();
    return;
  }

  nextButtonToPress++;
  if (nextButtonToPress >= buttonOrder.length) {
    taskComplete();
  }
}

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const gridWidth = room.GetGridWidth();

  for (let i = 0; i < BUTTON_GRID_INDEXES.length; i++) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const gridIndex = BUTTON_GRID_INDEXES[i]!;
    const textGridIndex = gridIndex - gridWidth;
    const worldPosition = room.GetGridPosition(textGridIndex);
    const position = Isaac.WorldToRenderPosition(worldPosition);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const num = buttonOrder[i]!;
    const text = (num + 1).toString();
    drawFontText(text, position);
  }
}
