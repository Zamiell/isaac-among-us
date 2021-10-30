import { EntityTypeCustom } from "../enums";

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallbacks.MC_POST_NPC_RENDER,
    keepStationary,
    EntityTypeCustom.BOX,
  );
  mod.AddCallback(
    ModCallbacks.MC_POST_NPC_RENDER,
    keepStationary,
    EntityTypeCustom.TABLE,
  );
  mod.AddCallback(
    ModCallbacks.MC_POST_NPC_RENDER,
    keepStationary,
    EntityTypeCustom.ADMIN_TABLE,
  );
}

function keepStationary(npc: EntityNPC) {
  // Entities with an ID of 1000 or higher will never have collision
  if (npc.Type >= EntityType.ENTITY_EFFECT) {
    return;
  }

  const data = npc.GetData();
  if (data.position === undefined) {
    data.position = npc.Position;
  }

  npc.Position = data.position as Vector;
  npc.Velocity = Vector.Zero;
}
