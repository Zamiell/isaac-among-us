import { EffectVariantCustom } from "../enums";
import * as button from "../features/button";
import * as makePentagram from "../tasks/makePentagram";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_UPDATE,
    pentagramBlackPowder,
    EffectVariant.PENTAGRAM_BLACKPOWDER,
  );

  mod.AddCallback(
    ModCallbacks.MC_POST_EFFECT_UPDATE,
    postEffectUpdateButton,
    EffectVariantCustom.BUTTON,
  );
}

// EffectVariant.PENTAGRAM_BLACKPOWDER (93)
function pentagramBlackPowder(effect: EntityEffect) {
  makePentagram.postEffectUpdatePentagramBlackPowder(effect);
}

function postEffectUpdateButton(effect: EntityEffect) {
  button.postEffectUpdateButton(effect);
}
