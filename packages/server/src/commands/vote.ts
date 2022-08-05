import { NOT_VOTED_YET, VOTE_SKIP } from "../constants";
import { error } from "../error";
import { getPlayer, getPlayerIndex } from "../game";
import { sendChat, sendVote } from "../sendGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Game } from "../types/Game";
import { MeetingPhase } from "../types/MeetingPhase";
import { Player } from "../types/Player";
import { Socket } from "../types/Socket";
import { VoteDataToServer } from "../types/SocketCommands";
import { meetingPhaseOverVoting } from "./meeting";

export function commandVote(
  socket: Socket,
  data: VoteDataToServer,
  extraData: ExtraCommandData,
): void {
  const { userID, username } = socket;
  const { userIDVotedFor, skip } = data;
  const { game, player } = extraData;

  if (
    !validate(socket, data, extraData) ||
    userID === undefined ||
    username === undefined ||
    game === undefined ||
    player === undefined ||
    game.meeting === null
  ) {
    return;
  }

  const playerIndex = getPlayerIndex(userID, game);
  if (playerIndex === undefined) {
    return;
  }

  let playerVotedFor: Player | undefined;
  if (!skip) {
    playerVotedFor = getPlayer(userIDVotedFor, game);
    if (playerVotedFor === undefined) {
      return;
    }
  }

  const value = skip ? VOTE_SKIP : userIDVotedFor;
  game.meeting.votes[playerIndex] = value;
  sendVote(game);

  // We send the chat on the server to avoid making the client have to go through the vote array and
  // scan for changes.
  const text =
    playerVotedFor === undefined
      ? "to skip."
      : `for: ${playerVotedFor.username}`;
  sendChat(game, "", `${username} voted ${text}`);

  if (allPlayersHaveVoted(game)) {
    meetingPhaseOverVoting(game);
  }
}

function validate(
  socket: Socket,
  data: VoteDataToServer,
  extraData: ExtraCommandData,
) {
  const { userIDVotedFor, skip } = data;
  const { game, player } = extraData;

  if (game === undefined || player === undefined) {
    return false;
  }

  if (game.meeting === null) {
    error(socket, "You cannot vote unless there is a meeting currently going.");
    return false;
  }

  if (game.meeting.meetingPhase !== MeetingPhase.VOTING) {
    error(
      socket,
      "You cannot vote until the voting phase of the meeting begins.",
    );
    return false;
  }

  const playerIndex = getPlayerIndex(player.userID, game);
  if (playerIndex === undefined) {
    return false;
  }

  const currentVote = game.meeting.votes[playerIndex];
  if (currentVote !== NOT_VOTED_YET) {
    error(socket, "You have already voted, so you cannot vote again.");
    return false;
  }

  if (userIDVotedFor < 0 && userIDVotedFor !== VOTE_SKIP) {
    error(socket, `The value of ${userIDVotedFor} is not a valid user ID.`);
    return false;
  }

  if (!skip) {
    const playerVotedFor = getPlayer(userIDVotedFor, game);
    if (playerVotedFor === undefined) {
      error(socket, `Player ${userIDVotedFor} is not in game ${game.id}.`);
      return false;
    }
  }

  return true;
}

function allPlayersHaveVoted(game: Game) {
  if (game.meeting === null) {
    return false;
  }

  for (const vote of game.meeting.votes) {
    if (vote === NOT_VOTED_YET) {
      return false;
    }
  }

  return true;
}
