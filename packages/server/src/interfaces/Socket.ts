import type * as net from "node:net";

export interface Socket extends net.Socket {
  socketID: number;
  loggedIn: boolean;
  userID: number | undefined;
  username: string | undefined;
}
