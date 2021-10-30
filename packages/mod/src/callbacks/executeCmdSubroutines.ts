import { log } from "isaacscript-common";

export function list(all = false): void {
  log("Entities in the room:");
  const roomEntities = Isaac.GetRoomEntities();
  for (let i = 0; i < roomEntities.length; i++) {
    const entity = roomEntities[i];

    // Exclude background effects
    if (
      !all &&
      entity.Type === EntityType.ENTITY_EFFECT &&
      (entity.Variant === EffectVariant.TINY_BUG || // 21
        entity.Variant === EffectVariant.WALL_BUG || // 68
        entity.Variant === EffectVariant.FALLING_EMBER || // 87
        entity.Variant === EffectVariant.LIGHT) // 121
    ) {
      continue;
    }

    let debugString = `${i + 1} - ${entity.Type}.${entity.Variant}.${
      entity.SubType
    }`;

    const bomb = entity.ToBomb();
    if (bomb !== undefined) {
      debugString += " (bomb)";
    }

    const effect = entity.ToEffect();
    if (effect !== undefined) {
      debugString += `.${effect.State} (effect)`;
    }

    const familiar = entity.ToFamiliar();
    if (familiar !== undefined) {
      debugString += `.${familiar.State} (familiar)`;
    }

    const knife = entity.ToKnife();
    if (knife !== undefined) {
      debugString += " (knife)";
    }

    const laser = entity.ToLaser();
    if (laser !== undefined) {
      debugString += " (laser)";
    }

    const npc = entity.ToNPC();
    if (npc !== undefined) {
      debugString += `.${npc.State} (NPC)`;
    }

    const pickup = entity.ToPickup();
    if (pickup !== undefined) {
      debugString += `.${pickup.State} (pickup)`;
    }

    const player = entity.ToPlayer();
    if (player !== undefined) {
      debugString += " (player)";
    }

    const projectile = entity.ToProjectile();
    if (projectile !== undefined) {
      debugString += " (projectile)";
    }

    const tear = entity.ToTear();
    if (tear !== undefined) {
      debugString += " (tear)";
    }

    debugString += ` (InitSeed: ${entity.InitSeed})`;
    debugString += ` (Position: ${entity.Position.X}, ${entity.Position.Y})`;
    log(debugString);
  }
  print('Logged the entities in the room to the "log.txt" file.');
}
