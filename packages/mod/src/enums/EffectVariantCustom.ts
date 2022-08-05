import { EffectVariant } from "isaac-typescript-definitions";

export const EffectVariantCustom = {
  STAGE_API_DOOR: Isaac.GetEntityVariantByName("StageAPIDoor") as EffectVariant,
  VENT: Isaac.GetEntityVariantByName("Vent") as EffectVariant,
  BUTTON: Isaac.GetEntityVariantByName("Button") as EffectVariant,
  MULTIPLAYER_PLAYER: Isaac.GetEntityVariantByName(
    "Multiplayer Player",
  ) as EffectVariant,
} as const;
