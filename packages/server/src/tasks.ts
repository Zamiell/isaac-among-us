import { IS_DEV, TASK_DESCRIPTIONS, Task, TaskType } from "common";
import type { Game } from "./classes/Game.js";
import type { Player } from "./classes/Player.js";
import {
  DEFAULT_NUM_COMMON_TASKS,
  DEFAULT_NUM_LONG_TASKS,
  DEFAULT_NUM_SHORT_TASKS,
} from "./constants.js";
import { getEnumValues, getRandomArrayElement } from "./isaacScriptCommonTS.js";

const DEV_TASK = undefined as Task | undefined;

export function assignTasks(game: Game): void {
  const allTasks = getEnumValues(Task);
  const remainingTasks = new Set<Task>(allTasks);

  for (const player of game.players) {
    for (const taskType of Object.values(TaskType)) {
      const remainingTasksOfThisType = getTasksOfType(remainingTasks, taskType);
      const numTasks = getNumTasks(taskType);
      for (let i = 0; i < numTasks; i++) {
        checkRefillTasks(remainingTasksOfThisType, taskType);

        const remainingTasksArray = [...remainingTasksOfThisType];
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
  if (!IS_DEV || DEV_TASK === undefined) {
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
  for (const task of tasks) {
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

function getAllTasksOfType(taskType: TaskType): readonly Task[] {
  const allTasksOfType: Task[] = [];
  for (const task of getEnumValues(Task)) {
    const taskDescription = TASK_DESCRIPTIONS[task];
    if (taskDescription.taskType === taskType) {
      allTasksOfType.push(task);
    }
  }

  return allTasksOfType;
}
