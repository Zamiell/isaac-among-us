import { ISCFeature, upgradeMod } from "isaacscript-common";
import { MOD_NAME } from "./constants";

const ISC_FEATURES_FOR_THIS_MOD = [
  ISCFeature.CUSTOM_HOTKEYS,
  ISCFeature.DISABLE_INPUTS,
  ISCFeature.EXTRA_CONSOLE_COMMANDS,
  ISCFeature.GAME_REORDERED_CALLBACKS,
  ISCFeature.RUN_IN_N_FRAMES,
  ISCFeature.MODDED_ELEMENT_DETECTION,
  ISCFeature.MODDED_ELEMENT_SETS,
  ISCFeature.SAVE_DATA_MANAGER,
] as const;

const modVanilla = RegisterMod(MOD_NAME, 1);
export const mod = upgradeMod(modVanilla, ISC_FEATURES_FOR_THIS_MOD);
