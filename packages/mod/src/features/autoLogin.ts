import { connectChatCommand } from "../chatCommands/connect";
import g from "../globals";
import { sendTCP } from "../network/send";
import * as socketClient from "../network/socketClient";
import { SocketCommandModToServer } from "../types/SocketCommands";

const DEBUG_FIRST_MOD = true;
const DEBUG_USERNAME = DEBUG_FIRST_MOD ? "Test1" : "Test2";
const DEBUG_PASSWORD = "test";
const DEBUG_GAME_NAME = "testGame";

let autoLogin = false;

export function startAutoLogin(): void {
  autoLogin = true;
  if (!socketClient.isConnected()) {
    connectChatCommand(true);
  }

  if (g.loggedIn) {
    onGameList();
  } else {
    sendTCP(SocketCommandModToServer.LOGIN, {
      username: DEBUG_USERNAME,
      password: DEBUG_PASSWORD,
    });
  }
}

export function onGameList(): void {
  if (!autoLogin || g.game !== null) {
    return;
  }

  if (DEBUG_FIRST_MOD) {
    sendTCP(SocketCommandModToServer.CREATE, {
      name: DEBUG_GAME_NAME,
    });
  } else {
    sendTCP(SocketCommandModToServer.JOIN, {
      name: DEBUG_GAME_NAME,
      created: false,
    });
  }
}

export function onGameDescription(): void {
  Isaac.DebugString("GETTING HERE 1");
  if (!autoLogin || g.game === null || g.game.started) {
    return;
  }

  Isaac.DebugString("GETTING HERE 2");
  sendTCP(SocketCommandModToServer.START, {
    gameID: g.game.id,
  });
  autoLogin = false;
}
