// We use a string enum instead of an integer enum since we need to use `TaskType` for the keys of
// `TaskList`, and converting integers to strings gets messy.
export enum TaskType {
  SHORT = "short",
  LONG = "long",
  COMMON = "common",
}
