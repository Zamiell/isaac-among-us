import { IS_DEV, Task, TaskType, TASK_DESCRIPTIONS } from "common";
import { getRandomArrayElement } from "./array";
import { Game } from "./classes/Game";
import { Player } from "./classes/Player";
import {
  DEFAULT_NUM_COMMON_TASKS,
  DEFAULT_NUM_LONG_TASKS,
  DEFAULT_NUM_SHORT_TASKS,
} from "./constants";
import { getEnumValues } from "./utils";

const DEV_TASK: Task | null = null;

export function assignTasks(game: Game): void {
  const allTasks = getEnumValues(Task);
  const remainingTasks = new Set<Task>(allTasks);

  for (const player of game.players) {
    for (const taskType of Object.values(TaskType)) {
      const remainingTasksOfThisType = getTasksOfType(remainingTasks, taskType);
      const numTasks = getNumTasks(taskType);
      for (let i = 0; i < numTasks; i++) {
        checkRefillTasks(remainingTasksOfThisType, taskType);

        const remainingTasksArray = Array.from(
          remainingTasksOfThisType.values(),
        );
        const task = getRandomArrayElement(remainingTasksArray);

        player.tasks[taskType].push(task);
        remainingTasks.delete(task);
        remainingTasksOfThisType.delete(task);
      }
    }

    addDevTask(player);
  }
}

function addDevTask(player: Player) {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!IS_DEV || DEV_TASK === null) {
    return;
  }

  const taskDescription = TASK_DESCRIPTIONS[DEV_TASK];
  const tasks = player.tasks[taskDescription.taskType];
  if (!tasks.includes(DEV_TASK)) {
    tasks.push(DEV_TASK);
  }
}

function getTasksOfType(tasks: Set<Task>, taskType: TaskType): Set<Task> {
  const tasksOfType = new Set<Task>();
  for (const task of tasks.values()) {
    const taskDescription = TASK_DESCRIPTIONS[task];
    if (taskDescription.taskType === taskType) {
      tasksOfType.add(task);
    }
  }

  return tasksOfType;
}

function getNumTasks(taskType: TaskType) {
  switch (taskType) {
    case TaskType.SHORT: {
      return DEFAULT_NUM_SHORT_TASKS;
    }

    case TaskType.LONG: {
      return DEFAULT_NUM_LONG_TASKS;
    }

    case TaskType.COMMON: {
      return DEFAULT_NUM_COMMON_TASKS;
    }
  }
}

function checkRefillTasks(tasks: Set<Task>, taskType: TaskType) {
  if (tasks.size === 0) {
    // There are so many players in this game that we have already assigned every task of this type;
    // re-insert all tasks back into the pool.
    const allTasksOfType = getAllTasksOfType(taskType);
    for (const task of allTasksOfType) {
      tasks.add(task);
    }
  }
}

function getAllTasksOfType(taskType: TaskType): Task[] {
  const allTasksOfType: Task[] = [];
  for (const task of getEnumValues(Task)) {
    const taskDescription = TASK_DESCRIPTIONS[task];
    if (taskDescription.taskType === taskType) {
      allTasksOfType.push(task);
    }
  }

  return allTasksOfType;
}
