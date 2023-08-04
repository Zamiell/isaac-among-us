import type { Task } from "../enums/Task";
import type { TaskType } from "../enums/TaskType";

export type TaskList = {
  [Value in TaskType]: Task[];
};
