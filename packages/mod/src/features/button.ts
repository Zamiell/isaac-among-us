import { ensureAllCases, getPlayerCloserThan } from "isaacscript-common";
import { taskDescriptions } from "../constants";
import { ButtonSubType, EffectVariantCustom } from "../enums";
import g from "../globals";
import { sendTCP } from "../network/send";
import { getSkeldRoom } from "../stageAPI";
import { MeetingType } from "../types/MeetingType";
import { SocketCommandModToServer } from "../types/SocketCommands";
import { Task } from "../types/Task";
import { spawnEntity } from "../util";
import { goToTaskRoom } from "./task";

interface ButtonData {
  task: Task;
}

const BUTTON_ACTIVATION_DISTANCE = 20;
const EMERGENCY_BUTTON_GRID_INDEX = 265;

const EMERGENCY_BUTTON_ANIMATION_SUFFIX = "Pentagram";
const SPECIAL_BUTTON_ANIMATION_SUFFIX = "Red";

export function postEffectUpdateButton(effect: EntityEffect): void {
  checkIfButtonIsPressed(effect);
}

function checkIfButtonIsPressed(effect: EntityEffect) {
  if (effect.State === PressurePlateState.PRESSURE_PLATE_PRESSED) {
    return;
  }

  const player = getPlayerCloserThan(
    effect.Position,
    BUTTON_ACTIVATION_DISTANCE,
  );
  if (player === undefined) {
    return;
  }

  effect.State = PressurePlateState.PRESSURE_PLATE_PRESSED;

  const sprite = effect.GetSprite();
  const animationSuffix = getButtonAnimationSuffix(effect.SubType);
  const animation = `Switched${animationSuffix}`;
  sprite.Play(animation, true);

  const sfx = SFXManager();
  sfx.Play(SoundEffect.SOUND_BUTTON_PRESS);

  buttonPressed(effect);
}

function buttonPressed(effect: EntityEffect) {
  const buttonSubType = effect.SubType as ButtonSubType;
  switch (buttonSubType) {
    // 0
    case ButtonSubType.TASK: {
      buttonPressedTask(effect);
      break;
    }

    // 1
    case ButtonSubType.TASK_RETURN: {
      buttonPressedTaskReturn();
      break;
    }

    // 2
    case ButtonSubType.EMERGENCY: {
      buttonPressedEmergency();
      break;
    }

    // 3
    case ButtonSubType.SPECIAL: {
      buttonPressedSpecial();
      break;
    }

    default: {
      ensureAllCases(buttonSubType);
    }
  }
}

function buttonPressedTask(effect: EntityEffect) {
  if (g.game === null) {
    return;
  }

  const data = effect.GetData() as unknown as ButtonData;
  const task = data.task;
  if (task === undefined) {
    error("Failed to read the task from a task button.");
  }
  g.game.currentTask = task;

  const taskDescription = taskDescriptions[task];
  goToTaskRoom(taskDescription);
}

function buttonPressedTaskReturn() {
  // TODO
}

function buttonPressedEmergency() {
  if (g.game === null) {
    return;
  }

  sendTCP(SocketCommandModToServer.MEETING, {
    meetingType: MeetingType.EMERGENCY,
    gameID: g.game.id,
    userIDKilled: 0,
  });
}

function buttonPressedSpecial() {
  // TODO
}

export function spawnTaskButtons(): void {
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
      ButtonSubType.TASK,
      taskDescription.gridIndex,
      enabled,
    );
    const data = button.GetData() as unknown as ButtonData;
    data.task = task;
  }
}

export function spawnEmergencyButton(): void {
  if (g.game === null) {
    return;
  }

  spawnButton(
    ButtonSubType.EMERGENCY,
    EMERGENCY_BUTTON_GRID_INDEX,
    !g.game.usedEmergencyMeeting,
  );
}

function spawnButton(
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

  button.State = enabled
    ? PressurePlateState.UNPRESSED
    : PressurePlateState.PRESSURE_PLATE_PRESSED;

  const sprite = button.GetSprite();
  const animationSuffix = getButtonAnimationSuffix(buttonSubType);
  const verb = enabled ? "Off" : "On";
  const animation = verb + animationSuffix;
  sprite.Play(animation, true);

  return button;
}

function getButtonAnimationSuffix(buttonSubType: ButtonSubType) {
  switch (buttonSubType) {
    case ButtonSubType.TASK:
    case ButtonSubType.TASK_RETURN: {
      return "";
    }

    case ButtonSubType.EMERGENCY: {
      return EMERGENCY_BUTTON_ANIMATION_SUFFIX;
    }

    case ButtonSubType.SPECIAL: {
      return SPECIAL_BUTTON_ANIMATION_SUFFIX;
    }

    default: {
      ensureAllCases(buttonSubType);
      return "";
    }
  }
}

export function removeEmergencyButton(): void {
  const buttons = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    EffectVariantCustom.BUTTON,
    ButtonSubType.EMERGENCY,
  );
  for (const button of buttons) {
    button.Remove();
  }
}
