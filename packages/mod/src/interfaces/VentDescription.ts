import type { SkeldRoom } from "common";
import type { Vent } from "../enums/Vent";

export interface VentDescription {
  readonly room: SkeldRoom;

  /** The grid index inside of the room of where the vent is spawned. */
  readonly gridIndex: number;

  readonly destination: Vent;
}
