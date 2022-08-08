// This file houses the data structure that stores all of the TCP sessions. Only one user per user
// ID should be logged in at the same time.

import { Socket } from "./interfaces/Socket";

let currentSocketID = 0; // Iterates upwards

/** Indexed by socket ID. */
export const tcpSockets = new Map<number, Socket>();

export function getNewTCPSocketID(): number {
  currentSocketID++;
  return currentSocketID;
}

export function getTCPSocketByUserID(userID: number): Socket | undefined {
  for (const socket of tcpSockets.values()) {
    if (socket.userID === userID && socket.loggedIn) {
      return socket;
    }
  }

  return undefined;
}

function getTCPSocketByUsername(username: string): Socket | undefined {
  for (const socket of tcpSockets.values()) {
    if (socket.username === username && socket.loggedIn) {
      return socket;
    }
  }

  return undefined;
}

export function disconnectExistingUserWithUsername(
  username: string | undefined,
): void {
  if (username === undefined) {
    return;
  }

  const socket = getTCPSocketByUsername(username);
  if (socket === undefined) {
    return;
  }

  socket.end();
  socket.destroy();
}
