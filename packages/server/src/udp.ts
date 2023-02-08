import { UDP_PORT } from "common";
import * as dgram from "node:dgram";
import struct from "struct";
import { IP } from "./constants";
import { getTCPSocketByUserID } from "./tcpSockets";
import { getGameMap, udpSockets } from "./udpSockets";

const UDP_TTL_SECONDS = 60;
const PURGE_UDP_SESSIONS_INTERVAL_MILLISECONDS = 1000;

const UDPMessageHeader = struct().word32Ule("gameID").word32Ule("userID");
const UDPMessageHeaderLength = UDPMessageHeader.allocate().buffer().length;

const UDPMessageBodyBeacon = struct().chars("HELLO", 5);
const UDPMessageBodyBeaconLength =
  UDPMessageBodyBeacon.allocate().buffer().length;

const UDPMessageBodyPosition = struct()
  .floatle("x")
  .floatle("y")
  .word32Ule("roomIndex")
  .chars("animation", 20)
  .word32Ule("animationFrame")
  .chars("overlayAnimation", 20)
  .word32Ule("overlayAnimationFrame");
const UDPMessageBodyPositionLength =
  UDPMessageBodyPosition.allocate().buffer().length;

const server = dgram.createSocket("udp4");

server.on("message", handleMessage);
server.on("listening", handleListening);
server.on("error", handleError);

function handleMessage(msg: Buffer, rinfo: dgram.RemoteInfo) {
  try {
    handleDataUDP(msg, rinfo);
  } catch (err) {
    console.error(`UDP error for ${getRemoteAddressUDP(rinfo)}: ${err}`);
  }
}

function handleDataUDP(msg: Buffer, rinfo: dgram.RemoteInfo) {
  const header = parseHeader(msg);
  if (header === undefined) {
    return;
  }
  const [gameID, userID] = header;

  if (!isValidSender(userID, rinfo)) {
    return;
  }

  const msgBody = msg.slice(UDPMessageHeaderLength);
  if (msgBody.length === UDPMessageBodyBeaconLength) {
    handleBeacon(gameID, userID, rinfo);
  } else if (msgBody.length === UDPMessageBodyPositionLength) {
    handlePosition(gameID, userID, msg);
  }
}

function parseHeader(msg: Buffer): [number, number] | undefined {
  if (msg.length < UDPMessageHeaderLength) {
    return undefined;
  }
  (UDPMessageHeader as any)._setBuff(msg); // eslint-disable-line

  const gameID = UDPMessageHeader.get("gameID") as number;
  if (typeof gameID !== "number" || gameID < 1) {
    return undefined;
  }

  const userID = UDPMessageHeader.get("userID") as number;
  if (typeof userID !== "number" || userID < 1) {
    return undefined;
  }

  return [gameID, userID];
}

function isValidSender(userID: number, rinfo: dgram.RemoteInfo) {
  const tcpSocket = getTCPSocketByUserID(userID);
  if (tcpSocket === undefined) {
    return false;
  }

  return tcpSocket.remoteAddress === rinfo.address;
}

function handleBeacon(gameID: number, userID: number, rinfo: dgram.RemoteInfo) {
  const gameMap = getGameMap(gameID);

  gameMap.set(userID, {
    userID,
    address: rinfo.address,
    port: rinfo.port,
    TTL: UDP_TTL_SECONDS,
  });
}

function handlePosition(gameID: number, userID: number, msg: Buffer) {
  const gameMap = getGameMap(gameID);

  for (const udpSocket of gameMap.values()) {
    if (udpSocket.userID !== userID) {
      server.send(msg, udpSocket.port, udpSocket.address);
    }
  }
}

function handleListening() {
  const address = server.address();
  console.log(`UDP server started: ${address.address}:${address.port}`);
}

function handleError(err: Error) {
  console.error("UDP server error:", err);
}

function purgeOldUDPSessions() {
  for (const [gameID, gameMap] of udpSockets) {
    for (const [userID, udpSocket] of gameMap) {
      udpSocket.TTL--;

      if (udpSocket.TTL > 0) {
        continue;
      }

      gameMap.delete(userID);
      console.log(`UDP server deleted user: ${userID}`);
      if (gameMap.size === 0) {
        udpSockets.delete(gameID);
        console.log(`UDP server deleted user: ${userID}`);
      }
    }
  }
}

function getRemoteAddressUDP(rinfo: dgram.RemoteInfo) {
  return `${rinfo.address}:${rinfo.port}`;
}

export function start(): void {
  server.bind(UDP_PORT, IP);
  setInterval(purgeOldUDPSessions, PURGE_UDP_SESSIONS_INTERVAL_MILLISECONDS);
}
