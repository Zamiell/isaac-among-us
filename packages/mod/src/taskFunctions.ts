import { bombRocks } from "./tasks/bombRocks";
import { buttonsBehindKeyBlocks } from "./tasks/buttonsBehindKeyBlocks";
import { destroyGiantPoop } from "./tasks/destroyGiantPoop";
import { fixWires } from "./tasks/fixWires";
import { identifyItems } from "./tasks/identifyItems";
import { identifyPickupsInOrder } from "./tasks/identifyPickupsInOrder";
import { identifyTrinkets } from "./tasks/identifyTrinkets";
import { killWorms } from "./tasks/killWorms";
import { loadSlotMachines } from "./tasks/loadSlotMachines";
import { makePentagram } from "./tasks/makePentagram";
import { pressButtonsWithGrudge } from "./tasks/pressButtonsWithGrudge";
import { pushTNTBarrel } from "./tasks/pushTNTBarrel";
import { walkBetweenSlides } from "./tasks/walkBetweenSlides";
import { walkBetweenSuctionPitfalls } from "./tasks/walkBetweenSuctionPitfalls";
import { walkDiagonallyThroughSpikes } from "./tasks/walkDiagonallyThroughSpikes";
import { Task } from "./types/Task";

export const taskFunctions = new Map<Task, () => void>();

// 0
taskFunctions.set(Task.SHORT_DESTROY_GIANT_POOP, destroyGiantPoop);

// 1
taskFunctions.set(Task.SHORT_BOMB_ROCKS, bombRocks);

// 2
taskFunctions.set(Task.SHORT_IDENTIFY_ITEMS, identifyItems);

// 3
taskFunctions.set(Task.SHORT_IDENTIFY_TRINKETS, identifyTrinkets);

// 4
taskFunctions.set(Task.SHORT_LOAD_SLOT_MACHINES, loadSlotMachines);

// 5
taskFunctions.set(Task.SHORT_MAKE_PENTAGRAM, makePentagram);

// 6
taskFunctions.set(Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE, pressButtonsWithGrudge);

// 7
taskFunctions.set(Task.SHORT_FIX_WIRES, fixWires);

// 8
taskFunctions.set(
  Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES,
  walkDiagonallyThroughSpikes,
);

// 9
taskFunctions.set(
  Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS,
  walkBetweenSuctionPitfalls,
);

// 10
taskFunctions.set(Task.SHORT_WALK_BETWEEN_SLIDES, walkBetweenSlides);

// 11
taskFunctions.set(Task.SHORT_PUSH_TNT_BARREL, pushTNTBarrel);

// 12
taskFunctions.set(Task.LONG_IDENTIFY_PICKUPS_IN_ORDER, identifyPickupsInOrder);

// 13
// TODO

// 14
taskFunctions.set(Task.LONG_KILL_WORMS, killWorms);

// 15
taskFunctions.set(Task.LONG_BUTTONS_BEHIND_KEY_BLOCKS, buttonsBehindKeyBlocks);

// 16
// TODO

// 17
// TODO

// 18
// TODO

// 19
// TODO
