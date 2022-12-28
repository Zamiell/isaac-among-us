import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnMedbayObjects(): void {
  for (const gridIndex of [42, 72, 102]) {
    spawnEntity(EntityTypeCustom.BED, 0, 0, gridIndex);
  }

  for (const gridIndex of [32, 62, 92]) {
    const bed = spawnEntity(EntityTypeCustom.BED, 0, 0, gridIndex);
    const sprite = bed.GetSprite();
    sprite.FlipX = true;
  }

  mod.runNextGameFrame(() => {
    addCollision(16, 108);
    addCollision(26, 118);
  });
}
