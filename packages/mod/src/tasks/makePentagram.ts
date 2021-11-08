import { taskComplete } from "../features/taskSubroutines";
import { spawnTeleporter } from "../features/teleporter";
import g from "../globals";
import { Task } from "../types/Task";
import {
  drawFontText,
  movePlayerToGridIndex,
  updatePlayerStats,
} from "../util";

const THIS_TASK = Task.LONG_MAKE_PENTAGRAM;
const REQUIRED_PENTAGRAM_SIZE = 250;
const TEXT_GRID_INDEX = 93;

export function makePentagram(): void {
  const game = Game();
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();

  const startGridIndex = 100;
  movePlayerToGridIndex(startGridIndex);
  updatePlayerStats();

  const topRightGridIndex = 42;
  spawnTeleporter(topRightGridIndex);

  Isaac.Spawn(
    EntityType.ENTITY_PICKUP,
    PickupVariant.PICKUP_COLLECTIBLE,
    CollectibleType.COLLECTIBLE_BLACK_POWDER,
    centerPos,
    Vector.Zero,
    undefined,
  );
}

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);

  const text = getText();
  drawFontText(text, position);
}

function getText() {
  const pentagrams = Isaac.FindByType(
    EntityType.ENTITY_EFFECT,
    EffectVariant.PENTAGRAM_BLACKPOWDER,
  );
  if (pentagrams.length === 0) {
    return "Make a pentagram.";
  }

  return "Not big enough!";
}

// ModCallbacks.MC_POST_EFFECT_UPDATE (55)
// EffectVariant.PENTAGRAM_BLACKPOWDER (93)
export function postEffectUpdatePentagramBlackPowder(
  effect: EntityEffect,
): void {
  if (g.game === null || g.game.currentTask !== THIS_TASK) {
    return;
  }

  if (effect.Scale > REQUIRED_PENTAGRAM_SIZE) {
    taskComplete();
  }
}
