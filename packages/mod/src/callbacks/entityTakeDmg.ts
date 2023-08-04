import type { DamageFlag } from "isaac-typescript-definitions";
import {
  EntityType,
  ModCallback,
  SoundEffect,
} from "isaac-typescript-definitions";
import { game, sfxManager } from "isaacscript-common";
import { taskLeave } from "../features/taskSubroutines";
import { g } from "../globals";
import { mod } from "../mod";

let gameFrameReturningFromTask: int | null = null;

export function init(): void {
  mod.AddCallback(
    ModCallback.ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.PLAYER,
  );
}

function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: BitFlags<DamageFlag>,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount === gameFrameReturningFromTask) {
    return false;
  }

  if (g.game === null || g.game.currentTask === null) {
    return undefined;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  sfxManager.Play(SoundEffect.THUMBS_DOWN);
  gameFrameReturningFromTask = gameFrameCount;
  taskLeave();

  return false;
}
