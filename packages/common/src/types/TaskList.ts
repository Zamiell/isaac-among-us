import { Task } from "./Task";
import { TaskType } from "./TaskType";

export type TaskList = {
  [Value in TaskType]: Task[];
};
