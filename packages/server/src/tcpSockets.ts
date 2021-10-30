// This file houses the data structure that stores all of the TCP sessions
// Only one user per user ID should be logged in at the same time

import { Socket } from "./types/Socket";

let currentSocketID = 0; // Iterates upwards

/** Indexed by socket ID. */
export const tcpSockets = new Map<number, Socket>();

export function getNewTCPSocketID(): number {
  currentSocketID += 1;
  return currentSocketID;
}

export function getTCPSocketByUserID(userID: number): Socket | null {
  for (const socket of tcpSockets.values()) {
    if (!socket.loggedIn) {
      continue;
    }

    if (socket.userID === userID) {
      return socket;
    }
  }

  return null;
}

function getTCPSocketByUsername(username: string): Socket | null {
  for (const socket of tcpSockets.values()) {
    if (!socket.loggedIn) {
      continue;
    }

    if (socket.username === username) {
      return socket;
    }
  }

  return null;
}

export function disconnectExistingUserWithUsername(
  username: string | null,
): void {
  if (username === null) {
    return;
  }

  const socket = getTCPSocketByUsername(username);
  if (socket === null) {
    return;
  }

  socket.end();
  socket.destroy();
}
