import { NOT_VOTED_YET, SocketCommandModToServer } from "common";
import { addLocalChat } from "./chat";
import { connectChatCommand } from "./chatCommands/connect";
import { passwordChatCommand } from "./chatCommands/password";
import { usernameChatCommand } from "./chatCommands/username";
import g from "./globals";
import { sendTCP } from "./network/send";
import * as socketClient from "./network/socketClient";
import { getOurPlayerIndex } from "./players";
import { getSkeldRoom } from "./stageAPI";
import { amOwner, restart } from "./utils";

export const chatCommandFunctions = new Map<string, (args: string[]) => void>();

chatCommandFunctions.set("connect", () => {
  connectChatCommand(false);
});

chatCommandFunctions.set("create", (args: string[]) => {
  if (args.length === 0) {
    addLocalChat(
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
  addLocalChat(
    "The Among Us Mod was made by Zamiel. It makes use of DeadInfinity's StageAPI library, Sentinel's collision library, and Somdudewillson's stage backdrops; special thanks goes to them. Thanks also goes to JSG, im_tem, Wofsauge, and AgentCucco for providing technical assistance.",
  );
});

chatCommandFunctions.set("debug", (_args: string[]) => {
  if (g.game === null) {
    addLocalChat("You must be in a game to do that.");
    return;
  }

  sendTCP(SocketCommandModToServer.DEBUG, {
    gameID: g.game.id,
  });
});

chatCommandFunctions.set("disconnect", (_args: string[]) => {
  socketClient.disconnect();
});

chatCommandFunctions.set("echo", (args: string[]) => {
  const text = args.join(" ");
  addLocalChat(text);
});

chatCommandFunctions.set("gamelist", (_args: string[]) => {
  sendTCP(SocketCommandModToServer.GAME_LIST, {});
});

chatCommandFunctions.set("help", (_args: string[]) => {
  addLocalChat('To connect to the server, use the "/connect" command.');
  addLocalChat("Hint: You can use tab to auto-complete commands.");
  g.welcomeNotificationEnabled = false;
});

chatCommandFunctions.set("join", (args: string[]) => {
  if (args.length === 0) {
    addLocalChat('You must provide a game name. (e.g. "/join Alice\'s game")');
    return;
  }

  if (g.game !== null) {
    addLocalChat("You are already in a game, so you cannot join a new one.");
    return;
  }

  const name = args.join(" ");
  sendTCP(SocketCommandModToServer.JOIN, {
    name,
    created: false,
  });
});

chatCommandFunctions.set("killme", (_args: string[]) => {
  if (g.game === null || g.userID === null) {
    return;
  }

  const room = getSkeldRoom();
  if (room === undefined) {
    return;
  }

  const player = Isaac.GetPlayer();

  sendTCP(SocketCommandModToServer.KILL_ME, {
    gameID: g.game.id,
    userIDKilled: g.userID,
    room,
    x: player.Position.X,
    y: player.Position.Y,
  });
});

chatCommandFunctions.set("leave", (_args: string[]) => {
  if (g.game === null) {
    addLocalChat("You are not in a game, so you cannot leave.");
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

chatCommandFunctions.set("revive", (_args: string[]) => {
  if (g.game === null) {
    return;
  }

  sendTCP(SocketCommandModToServer.REVIVE, {
    gameID: g.game.id,
  });
});

chatCommandFunctions.set("start", (_args: string[]) => {
  if (g.game === null) {
    addLocalChat("You are not in a game, so you cannot start it.");
    return;
  }

  if (!amOwner()) {
    addLocalChat("You are not the owner of this game, so you cannot start it.");
    return;
  }

  sendTCP(SocketCommandModToServer.START, {
    gameID: g.game.id,
  });
});

chatCommandFunctions.set("terminate", (_args: string[]) => {
  if (g.game === null) {
    addLocalChat("You are not in a game, so you cannot terminate it.");
    return;
  }

  if (!amOwner()) {
    addLocalChat(
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
  const nameVotedFor = args[0];
  if (nameVotedFor === undefined) {
    addLocalChat('You must provide a player name. (e.g. "/vote Alice")');
    return;
  }

  if (g.game === null) {
    addLocalChat("You can only perform that command in a game.");
    return;
  }

  if (g.game.meeting === null) {
    addLocalChat("You can only perform that command in a meeting.");
    return;
  }

  if (g.userID === null) {
    return;
  }

  const ourPlayerIndex = getOurPlayerIndex();
  if (ourPlayerIndex === undefined) {
    error('Failed to get our player index for the "vote" command.');
  }

  const ourPreviousVote = g.game.meeting.votes[ourPlayerIndex];
  if (ourPreviousVote !== NOT_VOTED_YET) {
    addLocalChat("You have already voted.");
    return;
  }

  const playerVotedFor = g.game.getPlayerFromUsername(nameVotedFor);
  if (playerVotedFor === undefined) {
    addLocalChat(`The player of "${nameVotedFor}" is not in this game.`);
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
    addLocalChat("You can only perform that command in a game.");
    return;
  }

  if (g.game.meeting === null) {
    addLocalChat("You can only perform that command in a meeting.");
    return;
  }

  if (g.userID === null) {
    return;
  }

  const ourPlayerIndex = getOurPlayerIndex();
  if (ourPlayerIndex === undefined) {
    error('Failed to get our player index for the "voteskip" command.');
  }

  const ourPreviousVote = g.game.meeting.votes[ourPlayerIndex];
  if (ourPreviousVote !== NOT_VOTED_YET) {
    addLocalChat("You have already voted.");
    return;
  }

  sendTCP(SocketCommandModToServer.VOTE, {
    gameID: g.game.id,
    userIDVotedFor: 0,
    skip: true,
  });
});
