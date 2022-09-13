import { SkeldRoom } from "common";

const SKELD_ROOM_MAP: ReadonlyMap<string, SkeldRoom> = new Map([
  ["Cafeteria", SkeldRoom.CAFETERIA],
  ["Admin Hall", SkeldRoom.ADMIN_HALL],
  ["Admin", SkeldRoom.ADMIN],
  ["Storage", SkeldRoom.STORAGE],
  ["Medbay Hall", SkeldRoom.MEDBAY_HALL],
  ["Medbay", SkeldRoom.MEDBAY],
  ["Upper Engine", SkeldRoom.UPPER_ENGINE],
  ["Engine Hall", SkeldRoom.ENGINE_HALL],
  ["Reactor", SkeldRoom.REACTOR],
  ["Security", SkeldRoom.SECURITY],
  ["Lower Engine", SkeldRoom.LOWER_ENGINE],
  ["Electrical Hall", SkeldRoom.ELECTRICAL_HALL],
  ["Electrical", SkeldRoom.ELECTRICAL],
  ["Weapons", SkeldRoom.WEAPONS],
  ["O2 Hall", SkeldRoom.O2_HALL],
  ["O2", SkeldRoom.O2],
  ["Navigation", SkeldRoom.NAVIGATION],
  ["Navigation Hall", SkeldRoom.NAVIGATION_HALL],
  ["Shields", SkeldRoom.SHIELDS],
  ["Communication Hall", SkeldRoom.COMMUNICATION_HALL],
  ["Communication", SkeldRoom.COMMUNICATION],

  ["Task", SkeldRoom.TASK],
  ["Lobby", SkeldRoom.LOBBY],
]);

export function getSkeldRoomFromName(roomName: string): SkeldRoom | undefined {
  return SKELD_ROOM_MAP.get(roomName);
}

const SKELD_ROOM_REVERSE_MAP: {
  readonly [key in SkeldRoom]: string;
} = {
  [SkeldRoom.CAFETERIA]: "Cafeteria",
  [SkeldRoom.ADMIN_HALL]: "Admin Hall",
  [SkeldRoom.ADMIN]: "Admin",
  [SkeldRoom.STORAGE]: "Storage",
  [SkeldRoom.MEDBAY_HALL]: "Medbay Hall",
  [SkeldRoom.MEDBAY]: "Medbay",
  [SkeldRoom.UPPER_ENGINE]: "Upper Engine",
  [SkeldRoom.ENGINE_HALL]: "Engine Hall",
  [SkeldRoom.REACTOR]: "Reactor",
  [SkeldRoom.SECURITY]: "Security",
  [SkeldRoom.LOWER_ENGINE]: "Lower Engine",
  [SkeldRoom.ELECTRICAL_HALL]: "Electrical Hall",
  [SkeldRoom.ELECTRICAL]: "Electrical",
  [SkeldRoom.WEAPONS]: "Weapons",
  [SkeldRoom.O2_HALL]: "O2 Hall",
  [SkeldRoom.O2]: "O2",
  [SkeldRoom.NAVIGATION]: "Navigation",
  [SkeldRoom.NAVIGATION_HALL]: "Navigation Hall",
  [SkeldRoom.SHIELDS]: "Shields",
  [SkeldRoom.COMMUNICATION_HALL]: "Communication Hall",
  [SkeldRoom.COMMUNICATION]: "Communication",

  [SkeldRoom.TASK]: "Task",
  [SkeldRoom.LOBBY]: "Lobby",
} as const;

export function getSkeldRoomName(room: SkeldRoom): string {
  return SKELD_ROOM_REVERSE_MAP[room];
}

export function getSkeldRoomNames(): string[] {
  return Object.values(SKELD_ROOM_REVERSE_MAP);
}
