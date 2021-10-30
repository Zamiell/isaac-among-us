import { IS_DEV } from "../../common/src/constants";

export * from "../../common/src/constants";
export * from "../../common/src/taskDescriptions";

export const IP = "0.0.0.0";

export const DEFAULT_NUM_SHORT_TASKS = 3;
export const DEFAULT_NUM_LONG_TASKS = 2;
export const DEFAULT_NUM_COMMON_TASKS = 0;

export const DEFAULT_MEETING_PRE_VOTE_SECONDS = IS_DEV ? 1 : 15;
export const DEFAULT_MEETING_VOTE_SECONDS = 150;
export const DEFAULT_MEETING_POST_VOTE_SECONDS = 5;
