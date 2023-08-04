import type { PlayerTypeAllowed, Task } from "common";
import { Role, SkeldRoom, TaskType } from "common";

export class Player {
  index: number;
  socketID: number;
  userID: number;
  username: string;
  connected = true;
  role = Role.CREW;
  character: PlayerTypeAllowed;
  alive = true;
  room = SkeldRoom.CAFETERIA;
  enterGridIndex = 0;
  usedEmergencyMeeting = false;
  tasks = {
    [TaskType.SHORT]: [] as Task[],
    [TaskType.LONG]: [] as Task[],
    [TaskType.COMMON]: [] as Task[],
  };

  constructor(
    index: number,
    socketID: number,
    userID: number,
    username: string,
    character: PlayerTypeAllowed,
  ) {
    this.index = index;
    this.socketID = socketID;
    this.userID = userID;
    this.username = username;
    this.character = character;
  }
}
