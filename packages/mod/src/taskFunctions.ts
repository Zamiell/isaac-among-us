import { bombRocks } from "./tasks/bombRocks";
import { buttonsBehindKeyBlocks } from "./tasks/buttonsBehindKeyBlocks";
import { collectPennies } from "./tasks/collectPennies";
import { defeatMonstro } from "./tasks/defeatMonstro";
import { destroyGiantPoop } from "./tasks/destroyGiantPoop";
import { dodgeRetractingSpikes } from "./tasks/dodgeRetractingSpikes";
import { dodgeStoneShooters } from "./tasks/dodgeStoneShooters";
import { fixWires } from "./tasks/fixWires";
import { identifyCollectibles } from "./tasks/identifyCollectibles";
import { identifyPickupsInOrder } from "./tasks/identifyPickupsInOrder";
import { identifyTrinkets } from "./tasks/identifyTrinkets";
import { killWorms } from "./tasks/killWorms";
import { loadSlotMachines } from "./tasks/loadSlotMachines";
import { makePentagram } from "./tasks/makePentagram";
import { pressButtonsWithGrudge } from "./tasks/pressButtonsWithGrudge";
import { pushButtonsInOrder } from "./tasks/pushButtonsInOrder";
import { pushTNTBarrel } from "./tasks/pushTNTBarrel";
import { walkBetweenSlides } from "./tasks/walkBetweenSlides";
import { walkBetweenSuctionPitfalls } from "./tasks/walkBetweenSuctionPitfalls";
import { walkDiagonallyThroughSpikes } from "./tasks/walkDiagonallyThroughSpikes";
import { Task } from "./types/Task";

export const taskFunctions = new Map<Task, () => void>();

taskFunctions.set(Task.SHORT_DESTROY_GIANT_POOP, destroyGiantPoop);
taskFunctions.set(Task.SHORT_BOMB_ROCKS, bombRocks);
taskFunctions.set(Task.SHORT_IDENTIFY_COLLECTIBLES, identifyCollectibles);
taskFunctions.set(Task.SHORT_IDENTIFY_TRINKETS, identifyTrinkets);
taskFunctions.set(Task.SHORT_PRESS_BUTTONS_WITH_GRUDGE, pressButtonsWithGrudge);
taskFunctions.set(Task.SHORT_FIX_WIRES, fixWires);
taskFunctions.set(
  Task.SHORT_WALK_DIAGONALLY_THROUGH_SPIKES,
  walkDiagonallyThroughSpikes,
);
taskFunctions.set(
  Task.SHORT_WALK_BETWEEN_SUCTION_PITFALLS,
  walkBetweenSuctionPitfalls,
);
taskFunctions.set(Task.SHORT_WALK_BETWEEN_SLIDES, walkBetweenSlides);
taskFunctions.set(Task.SHORT_PUSH_TNT_BARREL, pushTNTBarrel);
taskFunctions.set(Task.SHORT_DODGE_RETRACTING_SPIKES, dodgeRetractingSpikes);
taskFunctions.set(Task.SHORT_BUTTONS_BEHIND_KEY_BLOCKS, buttonsBehindKeyBlocks);
taskFunctions.set(Task.SHORT_PUSH_BUTTONS_IN_ORDER, pushButtonsInOrder);
taskFunctions.set(Task.SHORT_COLLECT_PENNIES, collectPennies);
taskFunctions.set(Task.LONG_LOAD_SLOT_MACHINES, loadSlotMachines);
taskFunctions.set(Task.LONG_MAKE_PENTAGRAM, makePentagram);
taskFunctions.set(Task.LONG_IDENTIFY_PICKUPS_IN_ORDER, identifyPickupsInOrder);
taskFunctions.set(Task.LONG_KILL_WORMS, killWorms);
taskFunctions.set(Task.LONG_DODGE_STONE_SHOOTERS, dodgeStoneShooters);
taskFunctions.set(Task.LONG_DEFEAT_MONSTRO, defeatMonstro);
