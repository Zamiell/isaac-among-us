import { SkeldRoom } from "./SkeldRoom";

export interface PlayerBody {
  userID: number;
  room: SkeldRoom;
  x: number;
  y: number;
  renderFrameKilled?: number;
}
