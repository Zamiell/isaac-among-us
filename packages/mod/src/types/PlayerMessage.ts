// Must roughly match PlayerData
export interface PlayerMessage {
  gameID: int;
  userID: int;
  x: float;
  y: float;
  roomIndex: int;
  animation: string;
  animationFrame: int;
  overlayAnimation: string;
  overlayAnimationFrame: int;
}
