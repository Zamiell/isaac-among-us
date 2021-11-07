import { EntityTypeCustom } from "../enums";
import { spawnEmergencyButton } from "../features/buttonSpawn";
import { spawnEntity } from "../util";

export const CENTER_TABLE_GRID_INDEX = 209;

export function spawnCafeteriaObjects(): void {
  spawnCafeteriaTable(119, 1); // Top-left
  spawnCafeteriaTable(132, 2); // Top-right
  spawnCafeteriaTable(CENTER_TABLE_GRID_INDEX, 3); // Center
  spawnCafeteriaTable(315, 4); // Bottom-left
  spawnCafeteriaTable(328, 5); // Bottom-right
  spawnEmergencyButton();
}

function spawnCafeteriaTable(gridIndex: int, num: int) {
  const table = spawnEntity(EntityTypeCustom.TABLE, 0, 0, gridIndex);

  const sprite = table.GetSprite();
  sprite.ReplaceSpritesheet(0, `gfx/cafeteria/table${num}.png`);
  sprite.LoadGraphics();
}
