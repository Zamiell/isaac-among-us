import { TCP_PORT } from "common";
import * as net from "node:net";
import {
  ensureAllCommandDataFieldsHaveValidatorFunctions,
  handleCommand,
} from "./command.js";
import { IP } from "./constants.js";
import {
  leaveNonStartedGames,
  setPlayerAsDisconnectedInOngoingGames,
} from "./disconnect.js";
import { getRemoteAddressTCP } from "./error.js";
import { Socket } from "./interfaces/Socket.js";
import { unpackTCPMsg } from "./pack.js";
import { sendAllUserConnected } from "./sendAll.js";
import { getNewTCPSocketID, tcpSockets } from "./tcpSockets.js";

ensureAllCommandDataFieldsHaveValidatorFunctions();

const server = net.createServer();

server.on("connection", handleConnection);
server.on("listening", handleListening);
server.on("error", handleError);

function handleConnection(vanillaSocket: net.Socket) {
  const socket = vanillaSocket as Socket;
  socket.socketID = getNewTCPSocketID();
  socket.loggedIn = false;

  console.log(
    `New TCP client with socket ID ${socket.socketID}: ${getRemoteAddressTCP(
      socket,
    )}`,
  );

  tcpSockets.set(socket.socketID, socket);

  socket.on("data", onConnData(socket));
  socket.on("error", onConnError(socket));
  socket.once("close", onConnClose(socket));
}

function onConnData(socket: Socket) {
  return (data: Buffer | string) => {
    try {
      handleDataTCP(data, socket);
    } catch (err) {
      const userDescription =
        socket.username === undefined
          ? getRemoteAddressTCP(socket)
          : socket.username;
      console.error(`Client error for "${userDescription}": ${err}`);
      console.error((err as Error).stack);
    }
  };
}

function handleDataTCP(dataBuffer: Buffer | string, socket: Socket) {
  const dataString = convertDataToString(dataBuffer);
  const [command, data] = unpackTCPMsg(dataString);
  handleCommand(socket, command, data);
}

function convertDataToString(data: Buffer | string) {
  if (typeof data === "string") {
    return data;
  }

  if (data instanceof Buffer) {
    return data.toString();
  }

  throw new Error("Unknown data type.");
}

function onConnClose(socket: Socket) {
  return () => {
    console.log(`TCP client closed: ${getRemoteAddressTCP(socket)}`);
    setPlayerAsDisconnectedInOngoingGames(socket.userID);
    leaveNonStartedGames(socket);
    if (socket.userID !== undefined && socket.username !== undefined) {
      sendAllUserConnected(socket.userID, socket.username, false);
    }
    tcpSockets.delete(socket.socketID);
  };
}

function onConnError(socket: Socket) {
  return (err: Error) => {
    console.log(
      `TCP client error: ${getRemoteAddressTCP(socket)} ${err.message}`,
    );
  };
}

function handleListening() {
  const address = server.address() as net.AddressInfo;
  console.log(`TCP server started: ${address.address}:${address.port}`);
}

function handleError(err: Error) {
  console.error(`TCP server error: ${err.message}`);
}

export function start(): void {
  server.listen(TCP_PORT, IP);
}
