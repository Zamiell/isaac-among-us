import { LoggedInDataToMod, SocketCommandModToServer } from "common";
import * as chat from "../chat";
import g from "../globals";
import { sendTCP } from "../network/send";

export function commandLoggedIn(data: LoggedInDataToMod): void {
  g.loggedIn = true;
  g.userID = data.userID;
  g.username = data.username;

  chat.addLocal("Successfully logged in.");
  sendTCP(SocketCommandModToServer.GAME_LIST, {});
}
