import { SkeldRoom } from "common";
import { Vent } from "../enums/Vent";

export interface VentDescription {
  readonly room: SkeldRoom;

  /** The grid index inside of the room of where the vent is spawned. */
  readonly gridIndex: number;

  readonly destination: Vent;
}
