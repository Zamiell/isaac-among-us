import {
  getEnumValues,
  getGridEntities,
  removeEntities,
} from "isaacscript-common";
import { EntityTypeCustom } from "../enums";
import g from "../globals";
import { spawnAdminObjects } from "../rooms/admin";
import { spawnCafeteriaObjects } from "../rooms/cafeteria";
import { spawnCommunicationObjects } from "../rooms/communication";
import { spawnElectricalObjects } from "../rooms/electrical";
import { spawnLowerEngineObjects } from "../rooms/lowerEngine";
import { spawnMedbayObjects } from "../rooms/medbay";
import { spawnNavigationObjects } from "../rooms/navigation";
import { spawnO2Objects } from "../rooms/o2";
import { spawnReactorObjects } from "../rooms/reactor";
import { spawnSecurityObjects } from "../rooms/security";
import { spawnShieldsObjects } from "../rooms/shields";
import { spawnStorageObjects } from "../rooms/storage";
import { spawnUpperEngineObjects } from "../rooms/upperEngine";
import { spawnWeaponsObjects } from "../rooms/weapons";
import { getSkeldRoom } from "../stageAPI";
import { SkeldRoom } from "../types/SkeldRoom";
import { removeGridEntity } from "../utils";
import { spawnGoToTaskButtons } from "./buttonSpawn";

export function postRoomLoad(): void {
  if (g.game === null || !g.game.started) {
    return;
  }

  const skeldRoom = getSkeldRoom();
  if (skeldRoom === null) {
    return;
  }

  emptyRoom();
  spawnGoToTaskButtons();
  const setupFunction = functionMap.get(skeldRoom);
  if (setupFunction !== undefined) {
    setupFunction();
  }
}

function emptyRoom() {
  for (const entityType of getEnumValues(EntityTypeCustom)) {
    const entities = Isaac.FindByType(entityType);
    removeEntities(entities);
  }

  for (const gridEntity of getGridEntities(
    GridEntityType.GRID_DECORATION,
    GridEntityType.GRID_ROCKB,
  )) {
    removeGridEntity(gridEntity);
  }
}

// We use a map since some rooms have no objects
const functionMap = new Map<SkeldRoom, () => void>();

functionMap.set(SkeldRoom.CAFETERIA, spawnCafeteriaObjects); // 0
functionMap.set(SkeldRoom.ADMIN, spawnAdminObjects); // 2
functionMap.set(SkeldRoom.STORAGE, spawnStorageObjects); // 3
functionMap.set(SkeldRoom.MEDBAY, spawnMedbayObjects); // 5
functionMap.set(SkeldRoom.UPPER_ENGINE, spawnUpperEngineObjects); // 6
functionMap.set(SkeldRoom.REACTOR, spawnReactorObjects); // 8
functionMap.set(SkeldRoom.SECURITY, spawnSecurityObjects); // 9
functionMap.set(SkeldRoom.LOWER_ENGINE, spawnLowerEngineObjects); // 10
functionMap.set(SkeldRoom.ELECTRICAL, spawnElectricalObjects); // 12
functionMap.set(SkeldRoom.WEAPONS, spawnWeaponsObjects); // 13
functionMap.set(SkeldRoom.O2, spawnO2Objects); // 15
functionMap.set(SkeldRoom.NAVIGATION, spawnNavigationObjects); // 16
functionMap.set(SkeldRoom.SHIELDS, spawnShieldsObjects); // 18
functionMap.set(SkeldRoom.COMMUNICATION, spawnCommunicationObjects); // 20
