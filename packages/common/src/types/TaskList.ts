import { Task } from "../enums/Task";
import { TaskType } from "../enums/TaskType";

export type TaskList = {
  [Value in TaskType]: Task[];
};
