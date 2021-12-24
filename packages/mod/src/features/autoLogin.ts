import { connectChatCommand } from "../chatCommands/connect";
import g from "../globals";
import { sendTCP } from "../network/send";
import * as socketClient from "../network/socketClient";
import {
  GameListDescription,
  SocketCommandModToServer,
} from "../types/SocketCommands";

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
    sendTCP(SocketCommandModToServer.GAME_LIST, {});
  } else {
    sendTCP(SocketCommandModToServer.LOGIN, {
      username: DEBUG_USERNAME,
      password: DEBUG_PASSWORD,
    });
  }
}

export function onGameList(gameList: GameListDescription[]): void {
  if (!autoLogin || g.game !== null) {
    return;
  }

  const testGameExists = gameList.some(
    (gameListDescription: GameListDescription) =>
      gameListDescription.name === DEBUG_GAME_NAME,
  );
  if (testGameExists) {
    sendTCP(SocketCommandModToServer.JOIN, {
      name: DEBUG_GAME_NAME,
      created: false,
    });
  } else {
    sendTCP(SocketCommandModToServer.CREATE, {
      name: DEBUG_GAME_NAME,
    });
  }
}

export function onGameDescription(): void {
  if (!autoLogin || g.game === null || g.game.started) {
    return;
  }

  /*
  sendTCP(SocketCommandModToServer.START, {
    gameID: g.game.id,
  });
  */
  autoLogin = false;
}
