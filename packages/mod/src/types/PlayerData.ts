// Must roughly match PlayerMessage
export interface PlayerData {
  userID: int;
  x: float;
  y: float;
  roomIndex: int;
  animation: string;
  animationFrame: int;
  overlayAnimation: string;
  overlayAnimationFrame: int;
  frameUpdated: int; // Used to stop drawing stale players
}
