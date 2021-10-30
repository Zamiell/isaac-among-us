import g from "../globals";
import { VoteDataToMod } from "../types/SocketCommands";

export function commandVote(data: VoteDataToMod): void {
  if (g.game === null || g.game.meeting === null) {
    return;
  }

  g.game.meeting.votes = data.votes;
}
