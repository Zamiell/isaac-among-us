import {
  ensureAllCases,
  getScreenBottomRightPos,
  log,
  setBlindfold,
} from "isaacscript-common";
import { EntityTypeCustom } from "./enums";
import { fonts } from "./fonts";
import g from "./globals";
import { Role } from "./types/Role";

export function amOwner(): boolean {
  if (g.game === null) {
    return false;
  }

  const firstPlayer = g.game.players[0];
  if (firstPlayer === undefined) {
    return false;
  }

  return firstPlayer.username === g.username;
}

export function consoleCommand(command: string): void {
  log(`Executing console command: ${command}`);
  Isaac.ExecuteCommand(command);
  log(`Finished executing console command: ${command}`);
}

export function disableShooting(): void {
  const player = Isaac.GetPlayer();
  setBlindfold(player, true);
  player.TryRemoveNullCostume(NullItemID.ID_BLINDFOLD);
}

export function drawFontText(
  text: string,
  position: Vector,
  opacity = 1,
): void {
  const scale = 1;
  const length = fonts.droid.GetStringWidthUTF8(text) * scale;
  const color = KColor(1, 1, 1, opacity);

  fonts.droid.DrawString(
    text,
    position.X - length / 2,
    position.Y,
    color,
    0,
    true,
  );
}

export function enableShooting(): void {
  const player = Isaac.GetPlayer();
  setBlindfold(player, false);
}

export function getRoleText(role: Role): string {
  switch (role) {
    case Role.CREW: {
      return "Crew";
    }

    case Role.IMPOSTER: {
      return "Imposter";
    }

    default: {
      ensureAllCases(role);
      return "Unknown";
    }
  }
}

/**
 * x and y from 0 to 1. For example, (0.4, 0.4) returns the position slightly top-left of center.
 */
export function getScreenPosition(x: float, y: float): Vector {
  const bottomRightPos = getScreenBottomRightPos();
  return Vector(x * bottomRightPos.X, y * bottomRightPos.Y);
}

export function movePlayerToGridIndex(gridIndex: int): void {
  const game = Game();
  const room = game.GetRoom();
  const position = room.GetGridPosition(gridIndex);
  const player = Isaac.GetPlayer();

  player.Position = position;
  player.Velocity = Vector.Zero;
}

export function removeGridEntity(gridEntity: GridEntity): void {
  const game = Game();
  const room = game.GetRoom();
  const gridIndex = gridEntity.GetGridIndex();
  room.RemoveGridEntity(gridIndex, 0, false); // gridEntity.Destroy() does not work

  // It is best practice to call the "Update()" method after removing a grid entity;
  // otherwise, spawning grid entities on the same tile can fail
  room.Update();
}

export function restart(): void {
  consoleCommand("restart");
}

export function spawnEntity(
  entityType: EntityType | EntityTypeCustom,
  variant: int,
  subType: int,
  gridIndex: int,
  depthOffset = -100, // -100 is needed for Cafeteria tables
  playAppearAnimation = false,
): Entity {
  const game = Game();
  const room = game.GetRoom();
  const position = room.GetGridPosition(gridIndex);

  const entity = Isaac.Spawn(
    entityType,
    variant,
    subType,
    position,
    Vector.Zero,
    undefined,
  );

  entity.DepthOffset = depthOffset;

  if (!playAppearAnimation) {
    entity.ClearEntityFlags(EntityFlag.FLAG_APPEAR);
  }

  return entity;
}

// ts-prune-ignore-next
export function traceback(): void {
  print(debug.traceback());
}

export function updatePlayerStats(): void {
  const player = Isaac.GetPlayer();
  player.AddCacheFlags(CacheFlag.CACHE_ALL);
  player.EvaluateItems();
}
