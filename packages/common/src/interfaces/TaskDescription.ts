import type { SkeldRoom } from "../enums/SkeldRoom";
import type { TaskType } from "../enums/TaskType";

export interface TaskDescription {
  readonly name: string;
  readonly taskType: TaskType;
  readonly room: SkeldRoom;

  /** The grid index inside of the room of where the button is spawned. */
  readonly gridIndex: number;

  /**
   * The grid index inside of the room where the player is returned to after they leave the task.
   * (They can't return to where the button is, or else they would automatically go back into the
   * task if they failed.)
   */
  readonly returnGridIndex: number;
}
