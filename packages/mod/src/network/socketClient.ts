import { log } from "isaacscript-common";
import * as chat from "../chat";
import {
  REMOTE_HOSTNAME,
  SOCKET_CLIENT_RETURN_SUCCESS,
  SOCKET_CONNECT_TIMEOUT_SECONDS,
  TCP_PORT,
  UDP_PORT,
} from "../constants";
import { setBlackSpriteState } from "../features/blackSprite";
import g from "../globals";
import { BlackSpriteState } from "../types/BlackSpriteState";
import { restart } from "../util";
import {
  getClientFromSandbox,
  isSandboxEnabled,
  tryInitRacingPlusSandbox,
} from "./sandbox";

let socket: Socket | null = null;
let clientTCP = null as SocketClient | null;
let clientUDP = null as SocketClient | null;

export function init(): void {
  // This will only work if the "--luadebug" flag is enabled
  const [ok, requiredSocket] = pcall(require, "socket");
  if (ok) {
    socket = requiredSocket as Socket;
  } else {
    tryInitRacingPlusSandbox();
  }
}

export function connect(): boolean {
  clientTCP = getClient(TCP_PORT, true);
  if (clientTCP === null) {
    return false;
  }

  clientUDP = getClient(UDP_PORT, false);
  if (clientUDP === null) {
    return false;
  }

  return true;
}

function getClient(port: int, useTCP = true) {
  if (isSandboxEnabled()) {
    return getClientFromSandbox(port, useTCP);
  }

  if (socket === null) {
    return null;
  }

  const protocol = useTCP ? "tcp" : "udp";
  const url = `${protocol}://${REMOTE_HOSTNAME}:${port}`;

  let socketClient: SocketClient;
  if (protocol === "tcp") {
    socketClient = socket.tcp();
    socketClient.settimeout(SOCKET_CONNECT_TIMEOUT_SECONDS);
    const [err, errMsg] = socketClient.connect(REMOTE_HOSTNAME, port);
    if (err !== SOCKET_CLIENT_RETURN_SUCCESS) {
      log(`Error: Failed to connect on "${url}": ${errMsg}`);
      return null;
    }
  } else if (protocol === "udp") {
    socketClient = socket.udp();
    socketClient.setpeername(REMOTE_HOSTNAME, port);
  } else {
    error(`Unknown protocol: ${protocol}`);
  }

  // We check for new socket data on every PostRender frame
  // However, the remote socket might not necessarily have any new data for us
  // Thus, we set the timeout to 0 in order to prevent lag
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

  chat.addLocal("Disconnected!");
  restart();
  setBlackSpriteState(BlackSpriteState.DISABLED);
}

export function send(
  packedMsg: string,
  useTCP: boolean,
): [number | undefined, string] {
  const client = useTCP ? clientTCP : clientUDP;
  const protocol = useTCP ? "TCP" : "UDP";
  if (client === null) {
    return [undefined, `${protocol} client is not initialized`];
  }

  return client.send(packedMsg);
}

export function receive(useTCP: boolean): [string | undefined, string] {
  const client = useTCP ? clientTCP : clientUDP;
  const protocol = useTCP ? "TCP" : "UDP";

  if (client === null) {
    return [undefined, `${protocol} client is not initialized`];
  }

  return client.receive();
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
  if (socket === null) {
    return 0;
  }

  return socket.gettime();
}
