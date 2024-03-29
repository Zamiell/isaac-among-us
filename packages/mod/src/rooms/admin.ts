import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums/EntityTypeCustom";
import { mod } from "../mod";
import { spawnEntity } from "../utils";

export function spawnAdminObjects(): void {
  spawnAdminTable();
  spawnAdminTop();
}

function spawnAdminTable() {
  const gridIndexCenter = 67; // We cannot use "GetCenterPos" because of StageAPI bugs.
  spawnEntity(EntityTypeCustom.ADMIN_TABLE, 0, 0, gridIndexCenter);
}

function spawnAdminTop() {
  const topCenterGridIndex = 22; // We can't spawn it inside the wall, so we have to use an offset.
  spawnEntity(EntityTypeCustom.ADMIN_TOP, 0, 0, topCenterGridIndex);

  mod.runNextGameFrame(() => {
    addCollision(19, 26);
  });
}
