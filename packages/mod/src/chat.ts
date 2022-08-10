import { ChatDataToMod } from "common";
import { log, logTable } from "isaacscript-common";
import { ChatMessage } from "./interfaces/ChatMessage";
import { getFormattedTime } from "./network/sandbox";

const chatMessages: ChatMessage[] = [];

export function addChat(data: ChatDataToMod, local = false): void {
  const isaacFrameCount = Isaac.GetFrameCount();
  const chatMessage: ChatMessage = {
    time: getFormattedTime(),
    username: data.from,
    msg: data.msg,
    renderFrameReceived: isaacFrameCount,
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

export function getAllChat(): ChatMessage[] {
  return [...chatMessages];
}

// ts-prune-ignore-next
export function logAllChatMessages(): void {
  chatMessages.forEach((chatMessage, i) => {
    log(`Chat message ${i}:`);
    logTable(chatMessage);
  });
}
