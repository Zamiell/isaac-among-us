import * as chat from "./chat";
import { connectChatCommand } from "./chatCommands/connect";
import { passwordChatCommand } from "./chatCommands/password";
import { usernameChatCommand } from "./chatCommands/username";
import { NOT_VOTED_YET } from "./constants";
import g from "./globals";
import { sendTCP } from "./network/send";
import * as socketClient from "./network/socketClient";
import { SocketCommandModToServer } from "./types/SocketCommands";
import { amOwner, restart } from "./util";

export const chatCommandFunctions = new Map<string, (args: string[]) => void>();

chatCommandFunctions.set("connect", () => {
  connectChatCommand(false);
});

chatCommandFunctions.set("create", (args: string[]) => {
  if (args.length === 0) {
    chat.addLocal(
      'You must provide a game name. (e.g. "/create Alice\'s game")',
    );
    return;
  }

  const name = args.join(" ");
  sendTCP(SocketCommandModToServer.CREATE, {
    name,
  });
});

chatCommandFunctions.set("credits", (_args: string[]) => {
  chat.addLocal(
    "The Among Us Mod was made by Zamiel. It makes use of DeadInfinity's StageAPI library, Sentinel's collision library, and Somdudewillson's stage backdrops; special thanks goes to them. Thanks also goes to JSG, imtem, Wofsauge, and AgentCucco for providing technical assistance.",
  );
});

chatCommandFunctions.set("disconnect", (_args: string[]) => {
  socketClient.disconnect();
});

chatCommandFunctions.set("echo", (args: string[]) => {
  const text = args.join(" ");
  chat.addLocal(text);
});

chatCommandFunctions.set("gamelist", (_args: string[]) => {
  sendTCP(SocketCommandModToServer.GAME_LIST, {});
});

chatCommandFunctions.set("help", (_args: string[]) => {
  chat.addLocal('To connect to the server, use the "/connect" command.');
  chat.addLocal("Hint: You can use tab to auto-complete commands.");
});

chatCommandFunctions.set("join", (args: string[]) => {
  if (args.length === 0) {
    chat.addLocal('You must provide a game name. (e.g. "/join Alice\'s game")');
    return;
  }

  if (g.game !== null) {
    chat.addLocal("You are already in a game, so you cannot join a new one.");
    return;
  }

  const name = args.join(" ");
  sendTCP(SocketCommandModToServer.JOIN, {
    name,
    created: false,
  });
});

chatCommandFunctions.set("leave", (_args: string[]) => {
  if (g.game === null) {
    chat.addLocal("You are not in a game, so you cannot leave.");
    return;
  }

  sendTCP(SocketCommandModToServer.LEAVE, {
    gameID: g.game.id,
  });
});

chatCommandFunctions.set("password", passwordChatCommand);

chatCommandFunctions.set("restart", (_args: string[]) => {
  restart();
});

chatCommandFunctions.set("start", (_args: string[]) => {
  if (g.game === null) {
    chat.addLocal("You are not in a game, so you cannot start it.");
    return;
  }

  if (!amOwner()) {
    chat.addLocal(
      "You are not the owner of this game, so you cannot start it.",
    );
    return;
  }

  sendTCP(SocketCommandModToServer.START, {
    gameID: g.game.id,
  });
});

chatCommandFunctions.set("terminate", (_args: string[]) => {
  if (g.game === null) {
    chat.addLocal("You are not in a game, so you cannot terminate it.");
    return;
  }

  if (!amOwner()) {
    chat.addLocal(
      "You are not the owner of this game, so you cannot terminate it.",
    );
    return;
  }

  sendTCP(SocketCommandModToServer.TERMINATE, {
    gameID: g.game.id,
  });
});

chatCommandFunctions.set("username", usernameChatCommand);

chatCommandFunctions.set("vote", (args: string[]) => {
  if (args.length === 0) {
    chat.addLocal('You must provide a player name. (e.g. "/vote Alice")');
    return;
  }

  if (g.game === null) {
    chat.addLocal("You can only perform that command in a game.");
    return;
  }

  if (g.game.meeting === null) {
    chat.addLocal("You can only perform that command in a meeting.");
    return;
  }

  if (g.userID === null) {
    return;
  }

  const ourPlayerIndex = g.game.getPlayerIndexFromUserID(g.userID);
  const ourPreviousVote = g.game.meeting.votes[ourPlayerIndex];
  if (ourPreviousVote !== NOT_VOTED_YET) {
    chat.addLocal("You have already voted.");
    return;
  }

  const nameVotedFor = args[0];
  const playerVotedFor = g.game.getPlayerFromUsername(nameVotedFor);
  if (playerVotedFor === null) {
    chat.addLocal(`The player of "${nameVotedFor}" is not in this game.`);
    return;
  }

  sendTCP(SocketCommandModToServer.VOTE, {
    gameID: g.game.id,
    userIDVotedFor: playerVotedFor.userID,
    skip: false,
  });
});

chatCommandFunctions.set("voteskip", (_args: string[]) => {
  if (g.game === null) {
    chat.addLocal("You can only perform that command in a game.");
    return;
  }

  if (g.game.meeting === null) {
    chat.addLocal("You can only perform that command in a meeting.");
    return;
  }

  if (g.userID === null) {
    return;
  }

  const ourPlayerIndex = g.game.getPlayerIndexFromUserID(g.userID);
  const ourPreviousVote = g.game.meeting.votes[ourPlayerIndex];
  if (ourPreviousVote !== NOT_VOTED_YET) {
    chat.addLocal("You have already voted.");
    return;
  }

  sendTCP(SocketCommandModToServer.VOTE, {
    gameID: g.game.id,
    userIDVotedFor: 0,
    skip: true,
  });
});
