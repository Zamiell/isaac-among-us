import { ErrorDataToMod } from "common";
import * as chat from "../chat";

export function commandError(data: ErrorDataToMod): void {
  chat.addLocal(`Error: ${data.msg}`);
}
