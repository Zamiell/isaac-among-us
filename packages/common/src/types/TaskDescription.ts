import { SkeldRoom } from "./SkeldRoom";
import { TaskType } from "./TaskType";

export interface TaskDescription {
  name: string;
  taskType: TaskType;
  room: SkeldRoom;
  gridIndex: number;
  returnGridIndex: number;
}
