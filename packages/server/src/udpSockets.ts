// This file houses the data structure that stores all of the UDP sessions
// These are not sessions in the traditional sense; rather, they are unauthenticated data streams
// that time out after a certain period of time

interface UDPSocket {
  userID: number;
  address: string;
  port: number;
  TTL: number;
}

/** Indexed by game ID then by user ID. Keys are TTL values. */
export const udpSockets = new Map<number, Map<number, UDPSocket>>();

export function getGameMap(gameID: number): Map<number, UDPSocket> {
  // Lazy-init the connection map for every game
  let gameMap = udpSockets.get(gameID);
  if (gameMap === undefined) {
    gameMap = new Map();
    udpSockets.set(gameID, gameMap);
  }

  return gameMap;
}
