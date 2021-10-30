import { getRoomIndex, getRoomVariant } from "isaacscript-common";
import { TaskDescription } from "../types/TaskDescription";
import { consoleCommand } from "../util";

// We use a room with no grid entities and a single Big Spider
const ROOM_VARIANT_FOR_TASK = 7;

export function goToTaskRoom(_taskDescription: TaskDescription): void {
  if (inTask()) {
    return;
  }

  consoleCommand(`goto d.${ROOM_VARIANT_FOR_TASK}`);
}

function inTask() {
  const roomIndex = getRoomIndex();
  const roomVariant = getRoomVariant();

  return (
    roomIndex === GridRooms.ROOM_DEBUG_IDX &&
    roomVariant === ROOM_VARIANT_FOR_TASK
  );
}
