import type { GridCollisionClass } from "isaac-typescript-definitions";

export function init(mod: Mod): void;
export function setCollisionRect(
  topLeft: Vector,
  bottomRight: Vector,
  gridCollisionClass?: GridCollisionClass,
  conditions?: () => void,
): void;
