import argon2 from "argon2";
import { error } from "../error";
import * as users from "../models/users";
import { sendAllUserConnected } from "../sendAll";
import { sendTCP } from "../sendTCP";
import { disconnectExistingUserWithUsername } from "../tcpSockets";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Socket } from "../types/Socket";
import {
  LoginDataToServer,
  SocketCommandServerToMod,
} from "../types/SocketCommands";

export async function commandLogin(
  socket: Socket,
  data: LoginDataToServer,
  _extraData: ExtraCommandData,
): Promise<void> {
  const { username, password } = data;
  const ip = socket.remoteAddress;
  if (ip === undefined) {
    return;
  }

  let user = await users.get(username);
  if (user === null) {
    const passwordHash = await argon2.hash(password);
    user = await users.create(username, passwordHash, ip);
  } else {
    const passwordMatches = await argon2.verify(user.passwordHash, password);
    if (!passwordMatches) {
      error(socket, `That password is incorrect for username: ${username}`);
      return;
    }
    await users.setIP(username, ip);
  }

  disconnectExistingUserWithUsername(socket.username);

  socket.loggedIn = true;
  socket.userID = user.id;
  // Re-apply the user's username in case they logged in with a stylization that does not match
  // the one in the database
  socket.username = user.username;

  sendTCP(socket, SocketCommandServerToMod.LOGGED_IN, {
    userID: socket.userID,
    username: socket.username,
  });

  sendAllUserConnected(socket.userID, socket.username, true);
}
