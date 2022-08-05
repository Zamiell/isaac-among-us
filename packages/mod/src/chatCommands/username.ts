import * as chat from "../chat";
import { sendTCP } from "../network/send";
import { SocketCommandModToServer } from "../types/SocketCommands";

export function usernameChatCommand(args: string[]): void {
  if (args.length === 0) {
    chat.addLocal('You must provide a username. (e.g. "/username Alice")');
    return;
  }

  if (args.length !== 1) {
    const username = args.join(" ");
    chat.addLocal(
      `The username of "${username}" is invalid; usernames cannot contain spaces.`,
    );
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const username = args[0]!;

  // From: https://stackoverflow.com/questions/12117965
  const match = string.match(username, "%W");
  if (match.length > 0) {
    chat.addLocal(
      `The username of "${username}" is invalid; username must only contain English letters and numbers.`,
    );
    return;
  }

  sendTCP(SocketCommandModToServer.CHECK_USERNAME, {
    username,
  });
}
