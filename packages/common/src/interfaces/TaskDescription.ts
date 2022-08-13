import { SkeldRoom } from "../enums/SkeldRoom";
import { TaskType } from "../enums/TaskType";

export interface TaskDescription {
  name: string;
  taskType: TaskType;
  room: SkeldRoom;
  gridIndex: number;
}
