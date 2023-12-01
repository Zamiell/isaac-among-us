import type { ChatDataToMod } from "common";
import { log, logTable } from "isaacscript-common";
import type { ChatMessage } from "./interfaces/ChatMessage";
import { getFormattedTime } from "./network/sandbox";

const chatMessages: ChatMessage[] = [];

export function addChat(data: ChatDataToMod, local = false): void {
  const renderFrameCount = Isaac.GetFrameCount();
  const chatMessage: ChatMessage = {
    time: getFormattedTime(),
    username: data.from,
    msg: data.msg,
    renderFrameReceived: renderFrameCount,
    local,
  };
  chatMessages.unshift(chatMessage);
}

export function addLocalChat(msg: string): void {
  const data: ChatDataToMod = {
    gameID: -1,
    from: "",
    msg,
  };
  addChat(data, true);
  log(msg);
}

export function getAllChat(): readonly ChatMessage[] {
  return [...chatMessages];
}

// ts-prune-ignore-next
export function logAllChatMessages(): void {
  for (const [i, chatMessage] of chatMessages.entries()) {
    log(`Chat message ${i}:`);
    logTable(chatMessage);
  }
}
