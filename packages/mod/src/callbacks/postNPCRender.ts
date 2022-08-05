import { EntityType, ModCallback } from "isaac-typescript-definitions";
import { VectorZero } from "isaacscript-common";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallback.POST_NPC_RENDER,
    keepStationary,
    EntityTypeCustom.BOX,
  );

  mod.AddCallback(
    ModCallback.POST_NPC_RENDER,
    keepStationary,
    EntityTypeCustom.TABLE,
  );

  mod.AddCallback(
    ModCallback.POST_NPC_RENDER,
    keepStationary,
    EntityTypeCustom.ADMIN_TABLE,
  );
}

function keepStationary(npc: EntityNPC) {
  // Entities with an ID of 1000 or higher will never have collision.
  if (npc.Type >= EntityType.EFFECT) {
    return;
  }

  const data = npc.GetData();
  if (data["position"] === undefined) {
    data["position"] = npc.Position;
  }

  npc.Position = data["position"] as Vector;
  npc.Velocity = VectorZero;
}
