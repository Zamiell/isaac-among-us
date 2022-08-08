import { log } from "isaacscript-common";
import { ChatMessage } from "./interfaces/ChatMessage";
import { getFormattedTime } from "./network/sandbox";
import { ChatDataToMod } from "./types/SocketCommands";

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
