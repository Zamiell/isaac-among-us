import { ensureAllCases, getEffects } from "isaacscript-common";
import { ButtonSubType, EffectVariantCustom } from "../enums";
import { Task } from "../types/Task";

const EMERGENCY_BUTTON_ANIMATION_SUFFIX = "Pentagram";
const SPECIAL_BUTTON_ANIMATION_SUFFIX = "Red";

export interface TaskButtonData {
  task: Task;
}

export function allButtonsPressed(): boolean {
  const buttons = getEffects(EffectVariantCustom.BUTTON);
  for (const button of buttons) {
    const pressed = button.State === PressurePlateState.PRESSURE_PLATE_PRESSED;
    if (!pressed) {
      return false;
    }
  }

  return true;
}

export function resetAllButtons(): void {
  const buttons = getEffects(EffectVariantCustom.BUTTON);
  for (const button of buttons) {
    resetButton(button);
  }
}

export function resetButton(button: EntityEffect): void {
  button.State = PressurePlateState.UNPRESSED;

  const sprite = button.GetSprite();
  const animationSuffix = getButtonAnimationSuffix(button.SubType);
  const animation = `Off${animationSuffix}`;
  sprite.Play(animation, true);
}

export function getButtonAnimationSuffix(buttonSubType: ButtonSubType): string {
  switch (buttonSubType) {
    case ButtonSubType.GO_TO_TASK:
    case ButtonSubType.TASK_1:
    case ButtonSubType.TASK_2:
    case ButtonSubType.TASK_3:
    case ButtonSubType.TASK_4:
    case ButtonSubType.TASK_5:
    case ButtonSubType.TASK_6:
    case ButtonSubType.TASK_7:
    case ButtonSubType.TASK_8: {
      return "";
    }

    case ButtonSubType.EMERGENCY: {
      return EMERGENCY_BUTTON_ANIMATION_SUFFIX;
    }

    case ButtonSubType.CAMERA:
    case ButtonSubType.LIGHTS:
    case ButtonSubType.COMMS:
    case ButtonSubType.O2: {
      return SPECIAL_BUTTON_ANIMATION_SUFFIX;
    }

    default: {
      ensureAllCases(buttonSubType);
      return "";
    }
  }
}
