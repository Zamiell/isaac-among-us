import { ChatDataToMod } from "common";
import * as chat from "../chat";

export function commandChat(data: ChatDataToMod): void {
  chat.add(data);
}
