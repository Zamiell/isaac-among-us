import { EffectVariantCustom } from "../enums";
import * as button from "../features/button";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_UPDATE,
    postEffectUpdateButton,
    EffectVariantCustom.BUTTON,
  );
}

function postEffectUpdateButton(effect: EntityEffect) {
  button.postEffectUpdateButton(effect);
}
