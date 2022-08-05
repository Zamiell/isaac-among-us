import { emptyArray, initArray } from "../array";
import {
  DEFAULT_MEETING_PRE_VOTE_SECONDS,
  DEFAULT_MEETING_VOTE_SECONDS,
  NOT_VOTED_YET,
  VOTE_SKIP,
} from "../constants";
import { error } from "../error";
import { games } from "../games";
import { sendEndMeeting, sendStartMeeting, sendStartVoting } from "../sendGame";
import { ExtraCommandData } from "../types/ExtraCommandData";
import { Game } from "../types/Game";
import { MeetingPhase } from "../types/MeetingPhase";
import { MeetingResolution } from "../types/MeetingResolution";
import { MeetingType } from "../types/MeetingType";
import { Socket } from "../types/Socket";
import { MeetingDataToServer } from "../types/SocketCommands";
import { getTimestamp } from "../utils";

export function commandMeeting(
  socket: Socket,
  data: MeetingDataToServer,
  extraData: ExtraCommandData,
): void {
  const { meetingType, userIDKilled } = data;
  const { game, player } = extraData;

  if (
    !validate(socket, data, extraData) ||
    game === undefined ||
    player === undefined
  ) {
    return;
  }

  if (meetingType === MeetingType.EMERGENCY) {
    player.usedEmergencyMeeting = true;
  }

  const playersKilledSinceLastMeeting = game.bodies.map((body) => body.userID);
  emptyArray(game.bodies);

  game.meeting = {
    meetingType,
    userIDInitiated: player.userID,
    userIDKilled,
    playersKilledSinceLastMeeting,
    meetingPhase: MeetingPhase.PRE_VOTING,
    timePhaseStarted: getTimestamp(),
    phaseLengthSeconds: DEFAULT_MEETING_PRE_VOTE_SECONDS,
    votes: initArray(game.players.length, NOT_VOTED_YET),
  };
  sendStartMeeting(game);

  setTimeout(() => {
    meetingPhaseOver(game);
  }, game.meeting.phaseLengthSeconds * 1000);
}

function validate(
  socket: Socket,
  data: MeetingDataToServer,
  extraData: ExtraCommandData,
) {
  const { meetingType } = data;
  const { game, player } = extraData;

  if (game === undefined || player === undefined) {
    return false;
  }

  if (meetingType === MeetingType.EMERGENCY && player.usedEmergencyMeeting) {
    error(
      socket,
      "You have already used your emergency meeting for this game.",
    );
    return false;
  }

  /*
  if (
    meetingType === MeetingType.EMERGENCY &&
    player.room !== SkeldRoom.CAFETERIA
  ) {
    error(socket, "You must be in the Cafeteria to call an emergency meeting.");
    return false;
  }
  */

  if (game.meeting !== null) {
    error(
      socket,
      "There is already a meeting going, so you cannot call another one.",
    );
    return false;
  }

  return true;
}

function meetingPhaseOver(game: Game) {
  // If the game was deleted in the meantime, do nothing.
  const gameInMap = games.get(game.id) !== undefined;
  if (!gameInMap) {
    return;
  }

  if (game.meeting === null) {
    return;
  }

  switch (game.meeting.meetingPhase) {
    case MeetingPhase.PRE_VOTING: {
      meetingPhaseOverPreVoting(game);
      break;
    }

    case MeetingPhase.VOTING: {
      meetingPhaseOverVoting(game);
      break;
    }
  }
}

function meetingPhaseOverPreVoting(game: Game) {
  if (game.meeting === null) {
    return;
  }

  game.meeting.meetingPhase = MeetingPhase.VOTING;
  game.meeting.phaseLengthSeconds = DEFAULT_MEETING_VOTE_SECONDS;
  game.meeting.timePhaseStarted = getTimestamp();

  sendStartVoting(game);

  setTimeout(() => {
    meetingPhaseOver(game);
  }, game.meeting.phaseLengthSeconds * 1000);
}

export function meetingPhaseOverVoting(game: Game): void {
  if (game.meeting === null) {
    return;
  }

  turnAllNonVotesIntoSkippedVotes(game);
  const [meetingResolution, userIDEjected] = getMeetingResolution(game);

  game.meeting = null;

  sendEndMeeting(game, meetingResolution, userIDEjected);
}

function turnAllNonVotesIntoSkippedVotes(game: Game) {
  if (game.meeting === null) {
    return;
  }

  for (let i = 0; i < game.meeting.votes.length; i++) {
    const vote = game.meeting.votes[i];
    if (vote === NOT_VOTED_YET) {
      game.meeting.votes[i] = VOTE_SKIP;
    }
  }
}

function getMeetingResolution(game: Game): [MeetingResolution, number] {
  const defaultReturn: [MeetingResolution, number] = [
    MeetingResolution.NO_EJECT,
    0,
  ];

  if (game.meeting === null) {
    throw new Error(
      "Failed to get the meeting resolution since the meeting was null.",
    );
  }

  const voteMap = getVoteMap(game.meeting.votes);
  for (
    let numVotesToLookFor = game.players.length;
    numVotesToLookFor > 0;
    numVotesToLookFor--
  ) {
    const userIDs = getUserIDsThatHaveNumVotes(numVotesToLookFor, voteMap);
    if (userIDs.length === 0) {
      // No-one got this many votes.
      continue;
    } else if (userIDs.length === 1) {
      const userID = userIDs[0]!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
      if (userID === VOTE_SKIP) {
        return defaultReturn;
      }

      return [MeetingResolution.EJECT, userID];
    } else {
      // The vote is tied between two or more people.
      return defaultReturn;
    }
  }

  return defaultReturn;
}

function getVoteMap(votes: number[]) {
  /** Indexed by user ID. Values are number of votes. */
  const voteMap = new Map<number, number>();

  for (const vote of votes) {
    if (vote === VOTE_SKIP) {
      continue;
    }

    let numVotesForThisPlayer = voteMap.get(vote);
    if (numVotesForThisPlayer === undefined) {
      numVotesForThisPlayer = 0;
    }

    numVotesForThisPlayer++;
    voteMap.set(vote, numVotesForThisPlayer);
  }

  return voteMap;
}

function getUserIDsThatHaveNumVotes(
  numVotesToMatch: number,
  voteMap: Map<number, number>,
) {
  const userIDs: number[] = [];
  for (const [userID, numVotes] of voteMap.entries()) {
    if (numVotes === numVotesToMatch) {
      userIDs.push(userID);
    }
  }

  return userIDs;
}
