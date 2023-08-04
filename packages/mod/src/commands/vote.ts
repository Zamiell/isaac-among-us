import type { VoteDataToMod } from "common";
import { g } from "../globals";

export function commandVote(data: VoteDataToMod): void {
  if (g.game === null || g.game.meeting === null) {
    return;
  }

  g.game.meeting.votes = data.votes;
}
