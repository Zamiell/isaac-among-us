import { SkeldRoom } from "./types/SkeldRoom";

export const skeldRoomMap = new Map<string, SkeldRoom>([
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
]);

type SkeldRoomReverseMap = {
  [Value in SkeldRoom]: string;
};

export const skeldRoomReverseMap: SkeldRoomReverseMap = {
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
};
