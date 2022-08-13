import { IS_DEV } from "common";

export const IP = "0.0.0.0";

export const DEFAULT_NUM_SHORT_TASKS = 3;
export const DEFAULT_NUM_LONG_TASKS = 2;
export const DEFAULT_NUM_COMMON_TASKS = 0;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const DEFAULT_MEETING_PRE_VOTE_SECONDS = IS_DEV ? 15 : 15;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const DEFAULT_MEETING_VOTE_SECONDS = IS_DEV ? 150 : 150;
