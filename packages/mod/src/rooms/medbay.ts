import { EntityTypeCustom } from "../enums";
import { spawnBlockLine } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnMedbayObjects(): void {
  for (const gridIndex of [42, 72, 102]) {
    spawnEntity(EntityTypeCustom.BED, 0, 0, gridIndex);
  }

  for (const gridIndex of [32, 62, 92]) {
    const bed = spawnEntity(EntityTypeCustom.BED, 0, 0, gridIndex);
    const sprite = bed.GetSprite();
    sprite.FlipX = true;
  }

  spawnBlockLine(16, 7, Direction.DOWN, false);
  spawnBlockLine(17, 7, Direction.DOWN, false);
  spawnBlockLine(18, 7, Direction.DOWN, false);

  spawnBlockLine(26, 7, Direction.DOWN, false);
  spawnBlockLine(27, 7, Direction.DOWN, false);
  spawnBlockLine(28, 7, Direction.DOWN, false);
}
