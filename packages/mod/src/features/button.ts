import {
  FAKE_TASK,
  MeetingType,
  Role,
  SkeldRoom,
  SocketCommandModToServer,
  Task,
} from "common";
import { PressurePlateState, SoundEffect } from "isaac-typescript-definitions";
import {
  asNumber,
  getPlayerCloserThan,
  getRoomGridIndex,
  sfxManager,
} from "isaacscript-common";
import { ButtonSubType } from "../enums/ButtonSubType";
import g from "../globals";
import { sendTCP } from "../network/send";
import { SKELD_ROOM_REVERSE_MAP } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { getStageAPIRoomName } from "../stageAPISubroutines";
import { buttonsBehindKeyBlocksButtonPressed } from "../tasks/buttonsBehindKeyBlocks";
import { fixWiresButtonPressed } from "../tasks/fixWires";
import { identifyCollectibleButtonPressed } from "../tasks/identifyCollectibles";
import { identifyPickupsInOrderButtonPressed } from "../tasks/identifyPickupsInOrder";
import { identifyTrinketButtonPressed } from "../tasks/identifyTrinkets";
import { pressButtonsWithGrudgeButtonPressed } from "../tasks/pressButtonsWithGrudge";
import { pushButtonsInOrderButtonPressed } from "../tasks/pushButtonsInOrder";
import { getButtonAnimationSuffix, TaskButtonData } from "./buttonSubroutines";
import { taskComplete } from "./taskSubroutines";

const BUTTON_ACTIVATION_DISTANCE = 20;

export function postEffectUpdateButton(effect: EntityEffect): void {
  checkIfButtonIsPressed(effect);
}

function checkIfButtonIsPressed(effect: EntityEffect) {
  if (effect.State === asNumber(PressurePlateState.PRESSURE_PLATE_PRESSED)) {
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
  const animationSuffix = getButtonAnimationSuffix(
    effect.SubType as ButtonSubType,
  );
  const animation = `Switched${animationSuffix}`;
  sprite.Play(animation, true);

  sfxManager.Play(SoundEffect.BUTTON_PRESS);

  buttonPressed(effect);
}

function buttonPressed(button: EntityEffect) {
  const buttonSubType = button.SubType as ButtonSubType;

  switch (buttonSubType) {
    // 0
    case ButtonSubType.GO_TO_TASK: {
      buttonPressedGoToTask(button);
      break;
    }

    // 1
    case ButtonSubType.EMERGENCY: {
      buttonPressedEmergency();
      break;
    }

    // 2
    case ButtonSubType.CAMERA: {
      // TODO
      break;
    }

    // 3
    case ButtonSubType.LIGHTS: {
      // TODO
      break;
    }

    // 4
    case ButtonSubType.COMMS: {
      // TODO
      break;
    }

    // 5
    case ButtonSubType.O2: {
      // TODO
      break;
    }

    // 6
    case ButtonSubType.TASK_1: {
      buttonPressedTask(button, 1);
      break;
    }

    // 7
    case ButtonSubType.TASK_2: {
      buttonPressedTask(button, 2);
      break;
    }

    // 8
    case ButtonSubType.TASK_3: {
      buttonPressedTask(button, 3);
      break;
    }

    // 9
    case ButtonSubType.TASK_4: {
      buttonPressedTask(button, 4);
      break;
    }

    // 10
    case ButtonSubType.TASK_5: {
      buttonPressedTask(button, 5);
      break;
    }

    // 10
    case ButtonSubType.TASK_6: {
      buttonPressedTask(button, 6);
      break;
    }

    // 10
    case ButtonSubType.TASK_7: {
      buttonPressedTask(button, 7);
      break;
    }

    // 10
    case ButtonSubType.TASK_8: {
      buttonPressedTask(button, 8);
      break;
    }
  }
}

function buttonPressedGoToTask(effect: EntityEffect) {
  if (g.game === null) {
    return;
  }

  const data = effect.GetData() as TaskButtonData;
  const { task } = data;
  if (task === undefined) {
    error("Failed to read the task from a task button.");
  }

  g.game.currentTask = g.game.role === Role.IMPOSTER ? FAKE_TASK : task;
  g.game.taskReturnRoomName =
    getStageAPIRoomName() ?? SKELD_ROOM_REVERSE_MAP[SkeldRoom.CAFETERIA];
  g.game.taskReturnRoomGridIndex = getRoomGridIndex();

  goToStageAPIRoom("Task");
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

function buttonPressedTask(button: EntityEffect, num: int) {
  if (g.game === null || g.game.currentTask === null) {
    return;
  }

  switch (g.game.currentTask) {
    case Task.SHORT_IDENTIFY_COLLECTIBLES: {
      identifyCollectibleButtonPressed(num);
      break;
    }

    case Task.SHORT_IDENTIFY_TRINKETS: {
      identifyTrinketButtonPressed(num);
      break;
    }

    case Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE: {
      pressButtonsWithGrudgeButtonPressed();
      break;
    }

    case Task.SHORT_FIX_WIRES: {
      fixWiresButtonPressed(button, num);
      break;
    }

    case Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES: {
      taskComplete();
      break;
    }

    case Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS: {
      taskComplete();
      break;
    }

    case Task.SHORT_WALK_BETWEEN_SLIDES: {
      taskComplete();
      break;
    }

    case Task.SHORT_DODGE_RETRACTING_SPIKES: {
      taskComplete();
      break;
    }

    case Task.SHORT_BUTTONS_BEHIND_KEY_BLOCKS: {
      buttonsBehindKeyBlocksButtonPressed();
      break;
    }

    case Task.SHORT_PUSH_BUTTONS_IN_ORDER: {
      pushButtonsInOrderButtonPressed(button);
      break;
    }

    case Task.LONG_IDENTIFY_PICKUPS_IN_ORDER: {
      identifyPickupsInOrderButtonPressed(button);
      break;
    }

    case Task.LONG_DODGE_STONE_SHOOTERS: {
      taskComplete();
      break;
    }

    default: {
      break;
    }
  }
}
