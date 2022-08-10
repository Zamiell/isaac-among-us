import { UsernameDataToMod } from "common";
import { addLocalChat } from "../chat";
import g from "../globals";

export function commandUsername(data: UsernameDataToMod): void {
  g.username = data.username;

  if (data.exists) {
    addLocalChat(
      `The username of "${data.username}" has already been registered.`,
    );
    addLocalChat(
      'To login as this user, enter the correct password with the "/password" command.',
    );
  } else {
    addLocalChat(`That username of "${data.username}" is available.`);
    addLocalChat(
      'Please register the account by providing a password with the "/password" command.',
    );
  }
}
