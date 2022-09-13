import { GameListDescription, SocketCommandModToServer } from "common";
import { connectChatCommand } from "../chatCommands/connect";
import g from "../globals";
import { sendTCP } from "../network/send";
import * as socketClient from "../network/socketClient";

const DEBUG_FIRST_MOD = true as boolean;
const DEBUG_USERNAME = DEBUG_FIRST_MOD ? "Test1" : "Test2";
const DEBUG_PASSWORD = "test";
const DEBUG_GAME_NAME = "testGame";
// (There is no game password.)

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
      password: "",
      created: false,
    });
  } else {
    sendTCP(SocketCommandModToServer.CREATE, {
      name: DEBUG_GAME_NAME,
      password: "",
    });
  }
}

export function onPlayerJoined(userID: int): void {
  if (
    // Don't do anything if we have already finished automatically logging in.
    !autoLogin ||
    // Don't do anything if this is the joined message from the game that we just created.
    userID === g.userID
  ) {
    return;
  }

  autoLogin = false;

  if (
    g.game !== null &&
    g.game.ownerUserID === g.userID &&
    g.game.players.length >= 2
  ) {
    sendTCP(SocketCommandModToServer.START, {
      gameID: g.game.id,
    });
  }
}
