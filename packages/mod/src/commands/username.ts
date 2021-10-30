import * as chat from "../chat";
import g from "../globals";
import { UsernameDataToMod } from "../types/SocketCommands";

export function commandUsername(data: UsernameDataToMod): void {
  g.username = data.username;

  if (data.exists) {
    chat.addLocal(
      `The username of "${data.username}" has already been registered.`,
    );
    chat.addLocal(
      'To login as this user, enter the correct password with the "/password" command.',
    );
  } else {
    chat.addLocal(`That username of "${data.username}" is available.`);
    chat.addLocal(
      'Please register the account by providing a password with the "/password" command.',
    );
  }
}
