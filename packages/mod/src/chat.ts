import { ChatDataToMod } from "common";
import { log, logTable } from "isaacscript-common";
import { ChatMessage } from "./interfaces/ChatMessage";
import { getFormattedTime } from "./network/sandbox";

const chatMessages: ChatMessage[] = [];

export function add(data: ChatDataToMod, local = false): void {
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

export function addLocal(msg: string): void {
  const data: ChatDataToMod = {
    gameID: -1,
    from: "",
    msg,
  };
  add(data, true);
  log(msg);
}

export function getAll(): ChatMessage[] {
  return [...chatMessages];
}

export function logAllChatMessages(): void {
  chatMessages.forEach((chatMessage, i) => {
    log(`Chat message ${i}:`);
    logTable(chatMessage);
  });
}
