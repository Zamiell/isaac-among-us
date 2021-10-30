import * as chat from "../chat";
import { ErrorDataToMod } from "../types/SocketCommands";

export function commandError(data: ErrorDataToMod): void {
  chat.addLocal(`Error: ${data.msg}`);
}
