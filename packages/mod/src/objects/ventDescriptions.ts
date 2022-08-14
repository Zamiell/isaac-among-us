import { SkeldRoom } from "common";
import { Vent } from "../enums/Vent";
import { VentDescription } from "../interfaces/VentDescription";

// Listed in order from top left to bottom right:
// https://www.pcgamesn.com/wp-content/uploads/2020/10/among-us-maps-the-skeld.jpg
export const VENT_DESCRIPTIONS: {
  readonly [key in Vent]: VentDescription;
} = {
  [Vent.UPPER_ENGINE]: {
    room: SkeldRoom.UPPER_ENGINE,
    gridIndex: 68, // Right of the engine
    destination: Vent.REACTOR_TOP,
  },
  [Vent.REACTOR_TOP]: {
    room: SkeldRoom.REACTOR,
    gridIndex: 31, // Top-left corner
    destination: Vent.UPPER_ENGINE,
  },

  [Vent.WEAPONS]: {
    room: SkeldRoom.WEAPONS,
    gridIndex: 81, // Top-right corner
    destination: Vent.NAVIGATION_TOP,
  },
  [Vent.NAVIGATION_TOP]: {
    room: SkeldRoom.NAVIGATION,
    gridIndex: 16, // Top-left corner
    destination: Vent.WEAPONS,
  },

  [Vent.CAFETERIA]: {
    room: SkeldRoom.CAFETERIA,
    gridIndex: 334, // Bottom-right corner
    destination: Vent.NAVIGATION_HALL,
  },
  [Vent.NAVIGATION_HALL]: {
    room: SkeldRoom.NAVIGATION_HALL,
    gridIndex: 46, // Top-left corner
    destination: Vent.ADMIN,
  },
  [Vent.ADMIN]: {
    room: SkeldRoom.ADMIN,
    gridIndex: 106, // Bottom-left corner
    destination: Vent.CAFETERIA,
  },

  [Vent.MEDBAY]: {
    room: SkeldRoom.MEDBAY,
    gridIndex: 114, // Bottom-right corner
    destination: Vent.ELECTRICAL,
  },
  [Vent.ELECTRICAL]: {
    room: SkeldRoom.ELECTRICAL,
    gridIndex: 16, // Top-left corner
    destination: Vent.SECURITY,
  },
  [Vent.SECURITY]: {
    room: SkeldRoom.SECURITY,
    gridIndex: 27, // Top-right corner
    destination: Vent.MEDBAY,
  },

  [Vent.NAVIGATION_BOTTOM]: {
    room: SkeldRoom.NAVIGATION,
    gridIndex: 106, // Bottom-left corner
    destination: Vent.SHIELDS,
  },
  [Vent.SHIELDS]: {
    room: SkeldRoom.SHIELDS,
    gridIndex: 99, // Middle-right
    destination: Vent.NAVIGATION_BOTTOM,
  },

  [Vent.REACTOR_BOTTOM]: {
    room: SkeldRoom.REACTOR,
    gridIndex: 76, // Bottom-left corner
    destination: Vent.LOWER_ENGINE,
  },
  [Vent.LOWER_ENGINE]: {
    room: SkeldRoom.LOWER_ENGINE,
    gridIndex: 114, // Above the engine
    destination: Vent.REACTOR_BOTTOM,
  },
} as const;
