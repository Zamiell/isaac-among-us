// Must roughly match PlayerMessage
export interface PlayerData {
  userID: int;
  /** In world position. */
  x: float;
  /** In world position. */
  y: float;
  roomIndex: int;
  animation: string;
  animationFrame: int;
  overlayAnimation: string;
  overlayAnimationFrame: int;
  /** Used to stop drawing stale players. */
  frameUpdated: int;
}
