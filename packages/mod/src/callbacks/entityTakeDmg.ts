import { game, sfxManager } from "isaacscript-common";
import { taskLeave } from "../features/taskSubroutines";
import g from "../globals";

let frameReturningFromTask: int | null = null;

export function init(mod: Mod): void {
  mod.AddCallback(
    ModCallbacks.MC_ENTITY_TAKE_DMG,
    entityTakeDmgPlayer,
    EntityType.ENTITY_PLAYER,
  );
}

function entityTakeDmgPlayer(
  tookDamage: Entity,
  _damageAmount: float,
  _damageFlags: DamageFlag,
  _damageSource: EntityRef,
  _damageCountdownFrames: int,
) {
  const gameFrameCount = game.GetFrameCount();

  if (gameFrameCount === frameReturningFromTask) {
    return false;
  }

  if (g.game === null || g.game.currentTask === null) {
    return undefined;
  }

  const player = tookDamage.ToPlayer();
  if (player === undefined) {
    return undefined;
  }

  sfxManager.Play(SoundEffect.SOUND_THUMBS_DOWN);
  frameReturningFromTask = gameFrameCount;
  taskLeave();

  return false;
}
