import { runNextFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums";
import { spawnVent } from "../spawnObjects";
import { spawnEntity } from "../util";

export function spawnAdminObjects(): void {
  const bottomLeftGridIndex = 106;

  spawnAdminTable();
  spawnVent(bottomLeftGridIndex);
  spawnAdminTop();
}

function spawnAdminTable() {
  const gridIndexCenter = 67; // We cannot use "GetCenterPos" because of StageAPI bugs
  spawnEntity(EntityTypeCustom.ADMIN_TABLE, 0, 0, gridIndexCenter);
}

function spawnAdminTop() {
  const topCenterGridIndex = 22; // We can't spawn it inside the wall, so we have to use an offset
  spawnEntity(EntityTypeCustom.ADMIN_TOP, 0, 0, topCenterGridIndex);

  runNextFrame(() => {
    addCollision(19, 26);
  });
}
