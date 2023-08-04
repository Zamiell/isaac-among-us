import type { ChatDataToMod } from "common";
import { addChat } from "../chat";

export function commandChat(data: ChatDataToMod): void {
  addChat(data);
}
