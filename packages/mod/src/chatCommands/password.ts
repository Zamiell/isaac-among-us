import { SocketCommandModToServer } from "common";
import { addLocalChat } from "../chat";
import { g } from "../globals";
import { sendTCP } from "../network/send";

export function passwordChatCommand(args: string[]): void {
  if (args.length === 0) {
    addLocalChat('You must provide a password. (e.g. "/password hunter2")');
    return;
  }

  const { username } = g;
  if (username === null) {
    addLocalChat(
      'You must specify a username first with the "/username" command. (e.g. "/username Alice")',
    );
    return;
  }

  const password = args.join(" ");
  sendTCP(SocketCommandModToServer.LOGIN, {
    username,
    password,
  });
}
