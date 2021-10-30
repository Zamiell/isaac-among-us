import * as net from "net";

export interface Socket extends net.Socket {
  socketID: number;
  loggedIn: boolean;
  userID: number | null;
  username: string | null;
}
