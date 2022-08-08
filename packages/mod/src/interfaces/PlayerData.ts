import { SkeldRoom } from "common";

// Must roughly match `PlayerMessage`.
export interface PlayerData {
  userID: int;

  /** In world position. */
  x: float;

  /** In world position. */
  y: float;

  /** The absolute value of the room grid index. */
  room: SkeldRoom;

  animation: string;
  animationFrame: int;
  overlayAnimation: string;
  overlayAnimationFrame: int;

  /** Used to stop drawing stale players. */
  renderFrameUpdated: int;
}
