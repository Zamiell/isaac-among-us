import { log } from "isaacscript-common";
import { commandMap } from "../commandMap";
import g from "../globals";
import * as players from "../players";
import {
  SocketCommandModToServer,
  SocketCommandServerToMod,
} from "../types/SocketCommands";
import { unpackTCPMsg, unpackUDPPlayerMessage } from "./pack";
import { sendTCP } from "./send";
import * as socketClient from "./socketClient";

const DEBUG = true;

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (!socketClient.isConnected()) {
    return;
  }

  // Send a ping as a quick test to see if the socket is still open
  const isaacFrameCount = Isaac.GetFrameCount();
  if (isaacFrameCount % 60 === 0) {
    sendTCP(SocketCommandModToServer.PING, {});
  }

  // Do nothing further if the ping failed
  if (!socketClient.isConnected()) {
    return;
  }

  // Read the socket until we run out of data to read
  while (readTCP()) {} // eslint-disable-line no-empty
  while (readUDP()) {} // eslint-disable-line no-empty
}

function readTCP() {
  if (!socketClient.isConnected()) {
    return false;
  }

  const [rawData, errMsg] = socketClient.receive(true);
  if (rawData === undefined) {
    if (errMsg !== "timeout") {
      log(`Failed to read data: ${errMsg}`);
      socketClient.disconnect();
    }

    return false;
  }

  if (DEBUG) {
    log(`Got socket data: ${rawData}`);
  }

  const [command, dataObject] = unpackTCPMsg(rawData);
  if (!validateTCPData(command, dataObject)) {
    return true;
  }

  const commandFunction = commandMap[command as SocketCommandServerToMod];
  if (commandFunction !== undefined) {
    // eslint-disable-next-line
    commandFunction(dataObject as any);
  } else {
    log(`Error: Received an unknown socket command: ${command}`);
  }

  return true;
}

function validateTCPData(command: string, dataObject: unknown) {
  if (type(dataObject) !== "table") {
    return false;
  }

  const data = dataObject as Record<string, unknown>;

  const gameID = data.gameID;
  if (gameID === undefined) {
    return true;
  }

  // The "joined" and "reconnect" commands are the only command that sends the game ID before the
  // game object is instantiated locally
  if (
    command === SocketCommandServerToMod.JOINED ||
    command === SocketCommandServerToMod.RECONNECT
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

  const [rawData, errMsg] = socketClient.receive(false);
  if (rawData === undefined) {
    if (errMsg !== "timeout") {
      log(`Failed to read data: ${errMsg}`);
      socketClient.disconnect();
    }

    return false;
  }

  // Only player positions are sent over the UDP socket
  const playerMessage = unpackUDPPlayerMessage(rawData);
  players.updatePlayerMap(playerMessage);

  return true;
}
