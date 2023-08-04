import type { LoggedInDataToMod} from "common";
import { SocketCommandModToServer } from "common";
import { addLocalChat } from "../chat";
import { g } from "../globals";
import { sendTCP } from "../network/send";

export function commandLoggedIn(data: LoggedInDataToMod): void {
  g.loggedIn = true;
  g.userID = data.userID;
  g.username = data.username;

  addLocalChat("Successfully logged in.");
  sendTCP(SocketCommandModToServer.GAME_LIST, {});
}
