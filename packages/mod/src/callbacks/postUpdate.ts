import * as debugFunction from "../debugFunction";
import * as disconnectHotkey from "../features/disconnectHotkey";
import * as doors from "../features/doors";

export function main(): void {
  debugFunction.postUpdate();
  disconnectHotkey.postUpdate();
  doors.postUpdate();
}
