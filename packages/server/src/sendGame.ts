// A collection of helper functions to send changes in the game state to all of the clients

import { sendTCP } from "./sendTCP";
import { getTCPSocketByUserID } from "./tcpSockets";
import { Game } from "./types/Game";
import { MeetingResolution } from "./types/MeetingResolution";
import { Role } from "./types/Role";
import { SkeldRoom } from "./types/SkeldRoom";
import { Socket } from "./types/Socket";
import {
  GameDescriptionPlayer,
  SocketCommandServerToMod,
  SocketCommandServerToModData,
} from "./types/SocketCommands";

export function sendNewGameDescription(game: Game): void {
  const players = getGameDescriptionPlayers(game);

  sendAll(game, SocketCommandServerToMod.GAME_DESCRIPTION, {
    gameID: game.id,
    players,
    started: game.started,
    meeting: game.meeting,
  });
}

export function getGameDescriptionPlayers(game: Game): GameDescriptionPlayer[] {
  const players: GameDescriptionPlayer[] = [];
  for (const player of game.players) {
    const playerDescription: GameDescriptionPlayer = {
      userID: player.userID,
      username: player.username,
      connected: player.connected,
      character: player.character,
      alive: player.alive,
      room: player.room,
      usedEmergencyMeeting: player.usedEmergencyMeeting,
    };
    players.push(playerDescription);
  }

  return players;
}

export function sendChat(game: Game, from: string, msg: string): void {
  sendAll(game, SocketCommandServerToMod.CHAT, {
    gameID: game.id,
    from,
    msg,
  });
}

export function sendStarted(game: Game): void {
  // We can't use sendAll because each player gets a customized message
  for (const player of game.players) {
    const socket = getTCPSocketByUserID(player.userID);
    if (socket !== null) {
      const imposters = player.role === Role.CREW ? null : game.impostors;
      sendTCP(socket, SocketCommandServerToMod.STARTED, {
        gameID: game.id,
        imposters,
        tasks: player.tasks,
      });
    }
  }
}

export function sendKilled(
  game: Game,
  userIDKilled: number,
  room: SkeldRoom,
  x: number,
  y: number,
): void {
  sendAll(game, SocketCommandServerToMod.KILLED, {
    gameID: game.id,
    userIDKilled,
    room,
    x,
    y,
  });
}

export function sendStartMeeting(game: Game): void {
  if (game.meeting === null) {
    return;
  }

  sendAll(game, SocketCommandServerToMod.START_MEETING, {
    gameID: game.id,
    meetingType: game.meeting.meetingType,
    userIDInitiated: game.meeting.userIDInitiated,
    userIDKilled: game.meeting.userIDKilled,
    playersKilledSinceLastMeeting: game.meeting.playersKilledSinceLastMeeting,
    timePhaseStarted: game.meeting.timePhaseStarted,
    phaseLengthSeconds: game.meeting.phaseLengthSeconds,
    votes: game.meeting.votes,
  });
}

export function sendStartVoting(game: Game): void {
  if (game.meeting === null) {
    return;
  }

  sendAll(game, SocketCommandServerToMod.START_VOTING, {
    gameID: game.id,
    timePhaseStarted: game.meeting.timePhaseStarted,
    phaseLengthSeconds: game.meeting.phaseLengthSeconds,
  });
}

export function sendVote(game: Game): void {
  if (game.meeting === null) {
    return;
  }

  sendAll(game, SocketCommandServerToMod.VOTE, {
    gameID: game.id,
    votes: game.meeting.votes,
  });
}

export function sendEndMeeting(
  game: Game,
  meetingResolution: MeetingResolution,
  userIDEjected: number,
): void {
  sendAll(game, SocketCommandServerToMod.END_MEETING, {
    gameID: game.id,
    meetingResolution,
    userIDEjected,
  });
}

export function sendEndGame(game: Game, winningRole: Role): void {
  const roles: Role[] = [];
  for (const player of game.players) {
    roles.push(player.role);
  }

  sendAll(game, SocketCommandServerToMod.END_GAME, {
    gameID: game.id,
    winningRole,
    roles,
  });
}

export function sendTerminated(game: Game): void {
  sendAll(game, SocketCommandServerToMod.TERMINATED, {
    gameID: game.id,
  });
}

function sendAll<T extends SocketCommandServerToMod>(
  game: Game,
  command: T,
  data: InstanceType<typeof SocketCommandServerToModData[T]>,
) {
  for (const socket of getActiveSockets(game)) {
    sendTCP(socket, command, data);
  }
}

function getActiveSockets(game: Game) {
  const sockets: Socket[] = [];
  for (const player of game.players) {
    const socket = getTCPSocketByUserID(player.userID);
    if (socket !== null) {
      sockets.push(socket);
    }
  }

  return sockets;
}
