import { SocketCommandModToServer, SocketCommandServerToMod } from "common";
import { asString, log } from "isaacscript-common";
import { CLIENT_COMMAND_MAP } from "../commandMap";
import { g } from "../globals";
import type { PlayerData } from "../interfaces/PlayerData";
import { unpackTCPMsg, unpackUDPPlayerMessage } from "./pack";
import { sendTCP } from "./send";
import * as socketClient from "./socketClient";
import type { UDPPositionInterface } from "./udpData";

const DEBUG = true as boolean;

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (!socketClient.isConnected()) {
    return;
  }

  // Send a ping as a quick test to see if the socket is still open.
  const renderFrameCount = Isaac.GetFrameCount();
  if (renderFrameCount % 60 === 0) {
    sendTCP(SocketCommandModToServer.PING, {});
  }

  // Do nothing further if the ping failed.
  if (!socketClient.isConnected()) {
    return;
  }

  // Read the socket until we run out of data to read.
  while (readTCP()) {} // eslint-disable-line no-empty
  while (readUDP()) {} // eslint-disable-line no-empty
}

function readTCP() {
  if (!socketClient.isConnected()) {
    return false;
  }

  const { data, errMsg } = socketClient.receive(true);
  if (data === undefined) {
    if (errMsg !== "timeout") {
      log(`Failed to read data: ${errMsg}`);
      socketClient.disconnect();
    }

    return false;
  }

  if (DEBUG) {
    log(`Got socket data: ${data}`);
  }

  const [command, dataObject] = unpackTCPMsg(data);
  if (!validateTCPData(command, dataObject)) {
    return true;
  }

  const commandFunction =
    CLIENT_COMMAND_MAP[command as SocketCommandServerToMod];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (commandFunction === undefined) {
    log(`Error: Received an unknown socket command: ${command}`);
  } else {
    // TypeScript cannot see through the correspondence:
    // https://gist.github.com/Zamiell/a7b51922385bbe811c339225d7a7fe7a
    commandFunction(dataObject as never);
  }

  return true;
}

function validateTCPData(command: string, dataObject: unknown) {
  if (type(dataObject) !== "table") {
    return false;
  }

  const data = dataObject as Record<string, unknown>;

  const { gameID } = data;
  if (gameID === undefined) {
    return true;
  }

  // The "joined" and "reconnect" commands are the only command that sends the game ID before the
  // game object is instantiated locally.
  if (
    command === asString(SocketCommandServerToMod.JOINED) ||
    command === asString(SocketCommandServerToMod.RECONNECT)
  ) {
    return true;
  }

  if (g.game === null) {
    return false;
  }

  return g.game.id === gameID;
}

function readUDP() {
  if (!socketClient.isConnected()) {
    return false;
  }

  const { data, errMsg } = socketClient.receive(false);
  if (data === undefined) {
    if (errMsg !== "timeout") {
      log(`Failed to read data: ${errMsg}`);
      socketClient.disconnect();
    }

    return false;
  }

  // Only player positions are sent over the UDP socket.
  const playerMessage = unpackUDPPlayerMessage(data);
  updatePlayerMap(playerMessage);

  return true;
}

function updatePlayerMap(playerPositionMessage: UDPPositionInterface) {
  if (g.game === null) {
    return;
  }

  if (playerPositionMessage.gameID !== g.game.id) {
    return;
  }

  const renderFrameCount = Isaac.GetFrameCount();

  const playerData: PlayerData = {
    userID: playerPositionMessage.userID,
    x: playerPositionMessage.x,
    y: playerPositionMessage.y,
    room: playerPositionMessage.room,
    animation: playerPositionMessage.animation,
    animationFrame: playerPositionMessage.animationFrame,
    overlayAnimation: playerPositionMessage.overlayAnimation,
    overlayAnimationFrame: playerPositionMessage.overlayAnimationFrame,
    renderFrameUpdated: renderFrameCount,
  };
  g.game.playerMap.set(playerData.userID, playerData);
}
