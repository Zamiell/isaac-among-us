import { TCP_PORT, UDP_PORT } from "common";
import { log, restart } from "isaacscript-common";
import { addLocalChat } from "../chat";
import { REMOTE_HOSTNAME } from "../constants";
import { BlackSpriteState } from "../enums/BlackSpriteState";
import { setBlackSpriteState } from "../features/blackSprite";
import { g } from "../globals";
import {
  getClientFromSandbox,
  getSocketTime,
  isSandboxEnabled,
  tryInitRacingPlusSandbox,
} from "./sandbox";

const SOCKET_CONNECT_TIMEOUT_SECONDS = 1;
const SOCKET_CLIENT_RETURN_SUCCESS = 1;

let socket: Socket | null = null;
let clientTCP = null as SocketClient | null;
let clientUDP = null as SocketClient | null;

export function init(): void {
  // This will only work if the "--luadebug" flag is enabled.
  const [ok, requiredSocket] = pcall(require, "socket");
  if (ok) {
    socket = requiredSocket as Socket;
  } else {
    tryInitRacingPlusSandbox();
  }
}

export function connect(): boolean {
  clientTCP = getClient(TCP_PORT, true) ?? null;
  if (clientTCP === null) {
    return false;
  }

  clientUDP = getClient(UDP_PORT, false) ?? null;
  if (clientUDP === null) {
    return false;
  }

  return true;
}

function getClient(port: int, useTCP = true): SocketClient | undefined {
  if (isSandboxEnabled()) {
    return getClientFromSandbox(port, useTCP);
  }

  if (socket === null) {
    return undefined;
  }

  const protocol = useTCP ? "TCP" : "UDP";
  const url = `${protocol}://${REMOTE_HOSTNAME}:${port}`;

  let socketClient: SocketClient;

  switch (protocol) {
    case "TCP": {
      socketClient = socket.tcp();
      socketClient.settimeout(SOCKET_CONNECT_TIMEOUT_SECONDS);
      const [err, errMsg] = socketClient.connect(REMOTE_HOSTNAME, port);
      if (err !== SOCKET_CLIENT_RETURN_SUCCESS) {
        log(`Error: Failed to connect on "${url}": ${errMsg}`);
        return undefined;
      }

      break;
    }

    case "UDP": {
      socketClient = socket.udp();
      socketClient.setpeername(REMOTE_HOSTNAME, port);

      break;
    }
  }

  // We check for new socket data on every `POST_RENDER` frame. However, the remote socket might not
  // necessarily have any new data for us. Thus, we set the timeout to 0 in order to prevent lag.
  socketClient.settimeout(0);

  log(`Connected to: ${url}`);
  return socketClient;
}

export function disconnect(): void {
  if (clientTCP !== null) {
    clientTCP.close();
  }
  clientTCP = null;

  if (clientUDP !== null) {
    clientUDP.close();
  }
  clientUDP = null;

  g.game = null;
  g.loggedIn = false;
  g.userID = null;
  g.username = null;

  addLocalChat("Disconnected!");
  restart();
  setBlackSpriteState(BlackSpriteState.DISABLED);
}

export function send(
  packedMsg: string,
  useTCP: boolean,
): { sentBytes?: number; errMsg?: string } {
  const client = useTCP ? clientTCP : clientUDP;
  const protocol = useTCP ? "TCP" : "UDP";
  if (client === null) {
    return { errMsg: `${protocol} client is not initialized` };
  }

  const [sentBytes, errMsg] = client.send(packedMsg);
  return { sentBytes, errMsg };
}

export function receive(useTCP: boolean): { data?: string; errMsg?: string } {
  const client = useTCP ? clientTCP : clientUDP;
  const protocol = useTCP ? "TCP" : "UDP";

  if (client === null) {
    return { errMsg: `${protocol} client is not initialized` };
  }

  const [data, errMsg] = client.receive();
  return { data, errMsg };
}

export function isConnected(): boolean {
  return clientTCP !== null && clientUDP !== null;
}

export function isLuaDebugEnabled(): boolean {
  return socket !== null || isSandboxEnabled();
}

/**
 * Returns the epoch timestamp in seconds, with four decimal places of precision (e.g.
 * `1640320492.5779`).
 */
export function getTime(): float {
  if (isSandboxEnabled()) {
    return getSocketTime();
  }

  if (socket === null) {
    error("The socket library was not initialized.");
  }

  return socket.gettime();
}
