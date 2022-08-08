import argon2 from "argon2";
import { LoginDataToServer, SocketCommandServerToMod } from "common";
import { error } from "../error";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";
import * as users from "../models/users";
import { sendAllUserConnected } from "../sendAll";
import { sendTCP } from "../sendTCP";
import { disconnectExistingUserWithUsername } from "../tcpSockets";

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
    // Create an entry in the database for this user.
    const passwordHash = await argon2.hash(password);
    user = await users.create(username, passwordHash, ip);
  } else {
    // This user already exists in the database.
    const passwordMatches = await argon2.verify(user.passwordHash, password);
    if (!passwordMatches) {
      error(socket, `That password is incorrect for username: ${username}`);
      return;
    }

    // Update the last IP address in the database.
    await users.setIP(username, ip);
  }

  disconnectExistingUserWithUsername(username);

  socket.loggedIn = true;
  socket.userID = user.id;
  // Re-apply the user's username in case they logged in with a stylization that does not match the
  // one in the database.
  socket.username = user.username;

  sendTCP(socket, SocketCommandServerToMod.LOGGED_IN, {
    userID: socket.userID,
    username: socket.username,
  });

  sendAllUserConnected(socket.userID, socket.username, true);
}
