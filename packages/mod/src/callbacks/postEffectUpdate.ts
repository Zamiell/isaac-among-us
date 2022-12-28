import { EffectVariant, ModCallback } from "isaac-typescript-definitions";
import { EffectVariantCustom } from "../enums/EffectVariantCustom";
import * as buttons from "../features/buttons";
import { mod } from "../mod";
import * as makePentagram from "../tasks/makePentagram";

export function init(): void {
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
  buttons.postEffectUpdateButton(effect);
}
