import { SkeldRoom } from "../enums/SkeldRoom";

export interface PlayerBody {
  readonly userID: number;
  readonly room: SkeldRoom;
  readonly x: number;
  readonly y: number;
  readonly renderFrameKilled?: number;
}
