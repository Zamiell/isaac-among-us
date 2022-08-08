// We use a string enum instead of an integer enum since we need to use `TaskType` for the keys of
// `TaskList`, and converting integers to strings gets messy.
export var TaskType;
(function (TaskType) {
    TaskType["SHORT"] = "short";
    TaskType["LONG"] = "long";
    TaskType["COMMON"] = "common";
})(TaskType || (TaskType = {}));
