import { SkeldRoom } from "./types/SkeldRoom";
import { Task } from "./types/Task";
import { TaskDescription } from "./types/TaskDescription";
import { TaskType } from "./types/TaskType";

type TaskDescriptions = {
  [Value in Task]: TaskDescription;
};

// Return grid indexes need to be at least 2 tiles away so that if the player is holding down a
// movement key, they do not automatically return to the task

export const taskDescriptions: TaskDescriptions = {
  // 0
  [Task.SHORT_DESTROY_GIANT_POOP]: {
    name: "Toilet Cleaning",
    taskType: TaskType.SHORT,
    room: SkeldRoom.CAFETERIA,
    gridIndex: 418, // Bottom-right corner
    returnGridIndex: 416,
  },

  // 1
  [Task.SHORT_BOMB_ROCKS]: {
    name: "Debris Clearing",
    taskType: TaskType.SHORT,
    room: SkeldRoom.UPPER_ENGINE,
    gridIndex: 228, // Below the engine
    returnGridIndex: 230,
  },

  // 2
  [Task.SHORT_IDENTIFY_ITEMS]: {
    name: "Item Calibration",
    taskType: TaskType.SHORT,
    room: SkeldRoom.SECURITY,
    gridIndex: 56,
    returnGridIndex: 54,
  },

  // 3
  [Task.SHORT_IDENTIFY_TRINKETS]: {
    name: "Trinket Calibration",
    taskType: TaskType.SHORT,
    room: SkeldRoom.SECURITY,
    gridIndex: 102,
    returnGridIndex: 100,
  },

  // 4
  [Task.SHORT_LOAD_SLOT_MACHINES]: {
    name: "Engine Boosting",
    taskType: TaskType.SHORT,
    room: SkeldRoom.LOWER_ENGINE,
    gridIndex: 368,
    returnGridIndex: 370,
  },

  // 5
  [Task.SHORT_MAKE_PENTAGRAM]: {
    name: "Summon Devil",
    taskType: TaskType.SHORT,
    room: SkeldRoom.COMMUNICATION,
    gridIndex: 108,
    returnGridIndex: 110,
  },

  // 6
  [Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE]: {
    name: "Shutdown Robotics",
    taskType: TaskType.SHORT,
    room: SkeldRoom.SHIELDS,
    gridIndex: 91,
    returnGridIndex: 93,
  },

  // 7
  [Task.SHORT_FIX_WIRES]: {
    name: "Fix Wires",
    taskType: TaskType.SHORT,
    room: SkeldRoom.ELECTRICAL,
    gridIndex: 57,
    returnGridIndex: 55,
  },

  // 8
  [Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES]: {
    name: "Disengage Thruster",
    taskType: TaskType.SHORT,
    room: SkeldRoom.WEAPONS,
    gridIndex: 101,
    returnGridIndex: 99,
  },

  // 9
  [Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS]: {
    name: "Repair Ship Hull",
    taskType: TaskType.SHORT,
    room: SkeldRoom.STORAGE,
    gridIndex: 190,
    returnGridIndex: 192,
  },

  // 10
  [Task.SHORT_WALK_BETWEEN_SLIDES]: {
    name: "Deactivate Drones",
    taskType: TaskType.SHORT,
    room: SkeldRoom.ELECTRICAL,
    gridIndex: 48,
    returnGridIndex: 50,
  },

  // 11
  [Task.SHORT_PUSH_TNT_BARREL]: {
    name: "Explode Excess Material",
    taskType: TaskType.SHORT,
    room: SkeldRoom.REACTOR,
    gridIndex: 106,
    returnGridIndex: 108,
  },

  // 12
  [Task.LONG_IDENTIFY_PICKUPS_IN_ORDER]: {
    name: "Pickup Calibration",
    taskType: TaskType.LONG,
    room: SkeldRoom.ADMIN,
    gridIndex: 118,
    returnGridIndex: 116,
  },

  // 13
  [Task.LONG_COLLECT_GOLDEN_PENNY]: {
    name: "Collect Spare Cash",
    taskType: TaskType.LONG,
    room: SkeldRoom.ADMIN,
    gridIndex: 17,
    returnGridIndex: 47,
  },

  // 14
  [Task.LONG_KILL_WORMS]: {
    name: "Kill Space Worms",
    taskType: TaskType.LONG,
    room: SkeldRoom.MEDBAY,
    gridIndex: 109,
    returnGridIndex: 111,
  },

  // 15
  [Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS]: {
    name: "Recover Locked Hard Drives",
    taskType: TaskType.LONG,
    room: SkeldRoom.COMMUNICATION,
    gridIndex: 46,
    returnGridIndex: 48,
  },

  // 16
  [Task.LONG_DODGE_RETRACTING_SPIKES]: {
    name: "Retrieve Fuel",
    taskType: TaskType.LONG,
    room: SkeldRoom.STORAGE,
    gridIndex: 170,
    returnGridIndex: 168,
  },

  // 17
  [Task.LONG_PUSH_BUTTONS_IN_ORDER]: {
    name: "Plot Ship Course",
    taskType: TaskType.LONG,
    room: SkeldRoom.NAVIGATION,
    gridIndex: 71,
    returnGridIndex: 69,
  },

  // 18
  [Task.LONG_DODGE_STONE_SHOOTERS]: {
    name: "Suppress Enemy Fire",
    taskType: TaskType.LONG,
    room: SkeldRoom.WEAPONS,
    gridIndex: 244,
    returnGridIndex: 242,
  },

  // 19
  [Task.LONG_DEFEAT_MONSTRO]: {
    name: "Defeat Space Blob",
    taskType: TaskType.LONG,
    room: SkeldRoom.O2,
    gridIndex: 61,
    returnGridIndex: 63,
  },
};
