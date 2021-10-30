import * as chat from "../chat";
import { ChatDataToMod } from "../types/SocketCommands";

export function commandChat(data: ChatDataToMod): void {
  chat.add(data);
}
