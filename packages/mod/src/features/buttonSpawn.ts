import { taskDescriptions } from "../constants";
import { ButtonSubType, EffectVariantCustom } from "../enums";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { spawnEntity } from "../utils";
import { getButtonAnimationSuffix, TaskButtonData } from "./buttonSubroutines";

export function spawnButton(
  buttonSubType: ButtonSubType,
  gridIndex: int,
  enabled: boolean,
): EntityEffect {
  const button = spawnEntity(
    EntityType.ENTITY_EFFECT,
    EffectVariantCustom.BUTTON,
    buttonSubType,
    gridIndex,
  ).ToEffect();
  if (button === undefined) {
    error("Failed to convert the button to an effect.");
  }

  setButtonState(button, enabled);

  return button;
}

export function setButtonState(button: EntityEffect, enabled: boolean): void {
  button.State = enabled
    ? PressurePlateState.UNPRESSED
    : PressurePlateState.PRESSURE_PLATE_PRESSED;

  const sprite = button.GetSprite();
  const animationSuffix = getButtonAnimationSuffix(button.SubType);
  const verb = enabled ? "Off" : "On";
  const animation = verb + animationSuffix;
  sprite.Play(animation, true);
}

export function spawnGoToTaskButtons(): void {
  if (g.game === null) {
    return;
  }

  const room = getSkeldRoom();
  if (room === null) {
    return;
  }

  for (const [key, taskDescription] of Object.entries(taskDescriptions)) {
    if (taskDescription.room !== room) {
      continue;
    }

    const task = tonumber(key);
    if (task === undefined) {
      continue;
    }

    const ourTasksOfThisType = g.game.ourTasks[taskDescription.taskType];
    const enabled = ourTasksOfThisType.includes(task);
    const button = spawnButton(
      ButtonSubType.GO_TO_TASK,
      taskDescription.gridIndex,
      enabled,
    );
    const data = button.GetData() as unknown as TaskButtonData;
    data.task = task;
  }
}

export function spawnTaskButton(gridIndex: int, num: int): EntityEffect {
  const buttonSubType = getTaskButtonSubType(num);
  return spawnButton(buttonSubType, gridIndex, true);
}

function getTaskButtonSubType(num: int) {
  switch (num) {
    case 1: {
      return ButtonSubType.TASK_1;
    }

    case 2: {
      return ButtonSubType.TASK_2;
    }

    case 3: {
      return ButtonSubType.TASK_3;
    }

    case 4: {
      return ButtonSubType.TASK_4;
    }

    case 5: {
      return ButtonSubType.TASK_5;
    }

    default: {
      return ButtonSubType.TASK_1;
    }
  }
}
