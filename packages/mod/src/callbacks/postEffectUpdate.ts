import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import * as button from "../features/button";
import * as makePentagram from "../tasks/makePentagram";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    pentagramBlackPowder,
    EffectVariant.PENTAGRAM_BLACK_POWDER,
  );

  mod.AddCallback(
    ModCallback.POST_EFFECT_UPDATE,
    postEffectUpdateButton,
    EffectVariantCustom.BUTTON,
  );
}

// EffectVariant.PENTAGRAM_BLACK_POWDER (93)
function pentagramBlackPowder(effect: EntityEffect) {
  makePentagram.postEffectUpdatePentagramBlackPowder(effect);
}

function postEffectUpdateButton(effect: EntityEffect) {
  button.postEffectUpdateButton(effect);
}
