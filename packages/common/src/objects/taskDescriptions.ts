import { SkeldRoom } from "../enums/SkeldRoom";
import { Task } from "../enums/Task";
import { TaskType } from "../enums/TaskType";
import { TaskDescription } from "../interfaces/TaskDescription";

// Return grid indexes need to be at least 2 tiles away so that if the player is holding down a
// movement key, they do not automatically return to the task.

// - Short tasks should take between 5-15 seconds.
// - Long tasks should take between 16-30 seconds.

export const TASK_DESCRIPTIONS: { [Value in Task]: TaskDescription } = {
  [Task.SHORT_DESTROY_GIANT_POOP]: {
    name: "Toilet Cleaning",
    taskType: TaskType.SHORT, // 14 seconds
    room: SkeldRoom.CAFETERIA,
    gridIndex: 418, // Bottom-right corner
  },

  [Task.SHORT_BOMB_ROCKS]: {
    name: "Debris Clearing",
    taskType: TaskType.SHORT, // 10 seconds
    room: SkeldRoom.UPPER_ENGINE,
    gridIndex: 228, // Below the engine
  },

  [Task.SHORT_IDENTIFY_COLLECTIBLES]: {
    name: "Item Calibration",
    taskType: TaskType.SHORT, // 9 seconds
    room: SkeldRoom.SECURITY,
    gridIndex: 56,
  },

  [Task.SHORT_IDENTIFY_TRINKETS]: {
    name: "Trinket Calibration",
    taskType: TaskType.SHORT, // 9 seconds
    room: SkeldRoom.SECURITY,
    gridIndex: 102,
  },

  [Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE]: {
    name: "Shutdown Robotics",
    taskType: TaskType.SHORT, // 8 seconds
    room: SkeldRoom.SHIELDS,
    gridIndex: 91,
  },

  [Task.SHORT_FIX_WIRES]: {
    name: "Fix Wires",
    taskType: TaskType.SHORT, // 9 seconds
    room: SkeldRoom.ELECTRICAL,
    gridIndex: 57,
  },

  [Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES]: {
    name: "Disengage Thruster",
    taskType: TaskType.SHORT, // 5.5 seconds
    room: SkeldRoom.WEAPONS,
    gridIndex: 101,
  },

  [Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS]: {
    name: "Repair Ship Hull",
    taskType: TaskType.SHORT, // 7 seconds
    room: SkeldRoom.STORAGE,
    gridIndex: 190,
  },

  [Task.SHORT_WALK_BETWEEN_SLIDES]: {
    name: "Deactivate Drones",
    taskType: TaskType.SHORT, // 8-9 seconds
    room: SkeldRoom.ELECTRICAL,
    gridIndex: 48,
  },

  [Task.SHORT_PUSH_TNT_BARREL]: {
    name: "Explode Excess Material",
    taskType: TaskType.SHORT, // 14 seconds
    room: SkeldRoom.REACTOR,
    gridIndex: 106,
  },

  [Task.SHORT_DODGE_RETRACTING_SPIKES]: {
    name: "Retrieve Fuel",
    taskType: TaskType.LONG, // 8 seconds
    room: SkeldRoom.STORAGE,
    gridIndex: 170,
  },

  [Task.SHORT_BUTTONS_BEHIND_KEY_BLOCKS]: {
    name: "Recover Locked Hard Drives",
    taskType: TaskType.LONG, // 15 seconds
    room: SkeldRoom.COMMUNICATION,
    gridIndex: 46,
  },

  [Task.SHORT_PUSH_BUTTONS_IN_ORDER]: {
    name: "Plot Ship Course",
    taskType: TaskType.LONG, // 7 seconds
    room: SkeldRoom.NAVIGATION,
    gridIndex: 71,
  },

  [Task.SHORT_COLLECT_PENNIES]: {
    name: "Collect Spare Cash",
    taskType: TaskType.LONG, // 10.5 seconds
    room: SkeldRoom.ADMIN,
    gridIndex: 17,
  },

  [Task.LONG_LOAD_SLOT_MACHINES]: {
    name: "Engine Boosting",
    taskType: TaskType.SHORT, // 15-26 seconds
    room: SkeldRoom.LOWER_ENGINE,
    gridIndex: 368,
  },

  [Task.LONG_MAKE_PENTAGRAM]: {
    name: "Summon Devil",
    taskType: TaskType.SHORT, // 20 seconds
    room: SkeldRoom.COMMUNICATION,
    gridIndex: 108,
  },

  [Task.LONG_IDENTIFY_PICKUPS_IN_ORDER]: {
    name: "Pickup Calibration",
    taskType: TaskType.LONG, // 31.5 seconds
    room: SkeldRoom.ADMIN,
    gridIndex: 118,
  },

  [Task.LONG_KILL_WORMS]: {
    name: "Kill Space Worms",
    taskType: TaskType.LONG, // 17 seconds
    room: SkeldRoom.MEDBAY,
    gridIndex: 109,
  },

  [Task.LONG_DODGE_STONE_SHOOTERS]: {
    name: "Suppress Enemy Fire",
    taskType: TaskType.LONG, // 19.5 seconds
    room: SkeldRoom.WEAPONS,
    gridIndex: 244,
  },

  [Task.LONG_DEFEAT_MONSTRO]: {
    name: "Defeat Space Blob",
    taskType: TaskType.LONG, // 20 seconds (after reducing HP)
    room: SkeldRoom.O2,
    gridIndex: 61,
  },
} as const;
