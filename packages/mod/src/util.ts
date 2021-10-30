import {
  ensureAllCases,
  getScreenBottomRightPos,
  log,
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

export function enableMinimapAPI(enabled: boolean): void {
  if (MinimapAPI !== undefined) {
    MinimapAPI.OverrideConfig.Disable = !enabled;
  }
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

export function initSprite(anm2Path: string, pngPath?: string): Sprite {
  const sprite = Sprite();

  if (pngPath === undefined) {
    sprite.Load(anm2Path, true);
  } else {
    sprite.Load(anm2Path, false);
    sprite.ReplaceSpritesheet(0, pngPath);
    sprite.LoadGraphics();
  }

  sprite.SetFrame("Default", 0);

  return sprite;
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

export function setSpriteOpacity(sprite: Sprite, opacity: float): void {
  sprite.Color = Color(1, 1, 1, opacity, 0, 0, 0);
}

export function spawnGridEntity(
  gridEntityType: GridEntityType,
  gridIndex: int,
): GridEntity {
  const game = Game();
  const room = game.GetRoom();
  const position = room.GetGridPosition(gridIndex);

  return Isaac.GridSpawn(gridEntityType, 0, position, true);
}

export function spawnEntity(
  entityType: EntityType | EntityTypeCustom,
  variant: int,
  subType: int,
  gridIndex: int,
  depthOffset = -100, // -100 is needed for Cafeteria tables
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
  entity.ClearEntityFlags(EntityFlag.FLAG_APPEAR);

  entity.DepthOffset = depthOffset;

  return entity;
}

export function traceback(): void {
  print(debug.traceback());
}
