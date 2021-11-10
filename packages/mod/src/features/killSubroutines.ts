import g from "../globals";
import { getClosestAmongUsPlayer } from "../players";
import { Role } from "../types/Role";
import { shouldShowUIButton } from "../ui";

const KILL_DISTANCE = 60;

export function ableToKillAPlayer(): boolean {
  if (
    !shouldShowUIButton() ||
    g.game === null ||
    g.game.role !== Role.IMPOSTER
  ) {
    return false;
  }

  const closestPlayer = getClosestAmongUsPlayer();
  if (closestPlayer === null) {
    return false;
  }

  const player = Isaac.GetPlayer();
  const otherPlayerPosition = Vector(closestPlayer.x, closestPlayer.y);
  const distance = player.Position.Distance(otherPlayerPosition);
  return distance <= KILL_DISTANCE;
}
