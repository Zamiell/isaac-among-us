import { NOT_VOTED_YET, SocketCommandModToServer } from "common";
import { logTable } from "isaacscript-common";
import { addLocalChat } from "./chat";
import { connectChatCommand } from "./chatCommands/connect";
import { passwordChatCommand } from "./chatCommands/password";
import { usernameChatCommand } from "./chatCommands/username";
import g from "./globals";
import { sendTCP } from "./network/send";
import * as socketClient from "./network/socketClient";
import { getOurPlayer } from "./players";
import { getSkeldRoom } from "./stageAPI";
import { amOwner } from "./utils";

export const chatCommandFunctionMap = new Map<
  string,
  (args: string[]) => void
>();

chatCommandFunctionMap.set("connect", () => {
  connectChatCommand(false);
});

chatCommandFunctionMap.set("create", (args: string[]) => {
  if (args.length === 0) {
    addLocalChat('You must provide a game name. (e.g. "/create Alice-game")');
    return;
  }

  if (args.length > 2) {
    addLocalChat(
      'The format of the "create" command is: /create [name] [password]',
    );
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const name = args[0]!;
  const password = args[1] ?? "";

  sendTCP(SocketCommandModToServer.CREATE, {
    name,
    password,
  });
});

chatCommandFunctionMap.set("credits", (_args: string[]) => {
  addLocalChat(
    "The Among Us Mod was made by Zamiel. It makes use of DeadInfinity's StageAPI library, Sentinel's collision library, and Somdudewillson's stage backdrops; special thanks goes to them. Thanks also goes to JSG, im_tem, Wofsauge, and AgentCucco for providing technical assistance.",
  );
});

chatCommandFunctionMap.set("debug", (_args: string[]) => {
  if (g.game === null) {
    addLocalChat("You must be in a game to do that.");
    return;
  }

  sendTCP(SocketCommandModToServer.DEBUG, {
    gameID: g.game.id,
  });
});

chatCommandFunctionMap.set("disconnect", (_args: string[]) => {
  socketClient.disconnect();
});

chatCommandFunctionMap.set("echo", (args: string[]) => {
  const text = args.join(" ");
  addLocalChat(text);
});

chatCommandFunctionMap.set("gameList", (_args: string[]) => {
  sendTCP(SocketCommandModToServer.GAME_LIST, {});
});

chatCommandFunctionMap.set("help", (_args: string[]) => {
  if (g.loggedIn) {
    addLocalChat(
      'To create a game, use the "/create [name] [password]" command. (Using a password is optional.)',
    );
    addLocalChat(
      'To join a game, use the "/join [name] [password]" command. (Using a password is optional.)',
    );
    addLocalChat(
      'To see a list of existing games, use the "/gameList" command.',
    );
  } else {
    addLocalChat('To connect to the server, use the "/connect" command.');
  }
  addLocalChat("Hint: You can use tab to auto-complete commands.");

  g.welcomeNotificationEnabled = false;
});

chatCommandFunctionMap.set("join", (args: string[]) => {
  if (args.length === 0) {
    addLocalChat('You must provide a game name. (e.g. "/join Alice\'s game")');
    return;
  }

  if (args.length > 2) {
    addLocalChat(
      'The format of the "join" command is: /join [name] [password]',
    );
    return;
  }

  if (g.game !== null) {
    addLocalChat("You are already in a game, so you cannot join a new one.");
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const name = args[0]!;
  const password = args[1] ?? "";

  sendTCP(SocketCommandModToServer.JOIN, {
    name,
    password,
    created: false,
  });
});

chatCommandFunctionMap.set("killMe", (_args: string[]) => {
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

chatCommandFunctionMap.set("leave", (_args: string[]) => {
  if (g.game === null) {
    addLocalChat("You are not in a game, so you cannot leave.");
    return;
  }

  sendTCP(SocketCommandModToServer.LEAVE, {
    gameID: g.game.id,
  });
});

chatCommandFunctionMap.set("log", (_args: string[]) => {
  logTable(g.game);
});

chatCommandFunctionMap.set("password", passwordChatCommand);

chatCommandFunctionMap.set("revive", (_args: string[]) => {
  if (g.game === null) {
    return;
  }

  sendTCP(SocketCommandModToServer.REVIVE, {
    gameID: g.game.id,
  });
});

chatCommandFunctionMap.set("start", (_args: string[]) => {
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

chatCommandFunctionMap.set("terminate", (_args: string[]) => {
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

chatCommandFunctionMap.set("userID", (_args: string[]) => {
  addLocalChat(`Your user ID is: ${g.userID}`);
});

chatCommandFunctionMap.set("username", usernameChatCommand);

chatCommandFunctionMap.set("vote", (args: string[]) => {
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

  const ourPlayer = getOurPlayer();
  if (ourPlayer === undefined) {
    error('Failed to get our player description for the "vote" command.');
  }

  if (!ourPlayer.alive) {
    addLocalChat("You can only perform that command when you are alive.");
    return;
  }

  const ourPreviousVote = g.game.meeting.votes[ourPlayer.index];
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

chatCommandFunctionMap.set("voteSkip", (_args: string[]) => {
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

  const ourPlayer = getOurPlayer();
  if (ourPlayer === undefined) {
    error('Failed to get our player description for the "voteskip" command.');
  }

  if (!ourPlayer.alive) {
    addLocalChat("You can only perform that command when you are alive.");
    return;
  }

  const ourPreviousVote = g.game.meeting.votes[ourPlayer.index];
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
