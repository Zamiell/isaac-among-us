import g from "../globals";
import { getOurPlayer } from "../players";
import { getSkeldRoom } from "../stageAPI";
import { shouldShowUIButton } from "../ui";

const REPORT_DISTANCE = 60;

export function ableToReportDeadBody(): boolean {
  if (!shouldShowUIButton() || g.game === null) {
    return false;
  }

  const ourPlayer = getOurPlayer();
  if (ourPlayer === undefined || !ourPlayer.alive) {
    return false;
  }

  const player = Isaac.GetPlayer();
  const room = getSkeldRoom();

  const bodiesInThisRoom = g.game.bodies.filter((body) => body.room === room);
  return bodiesInThisRoom.some((body) => {
    const bodyPosition = Vector(body.x, body.y);
    const distance = player.Position.Distance(bodyPosition);
    return distance <= REPORT_DISTANCE;
  });
}
