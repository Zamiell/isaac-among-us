import type { PlayerBody } from "common";
import { MeetingType, SocketCommandModToServer } from "common";
import { VentState } from "../enums/VentState";
import { g } from "../globals";
import { sendTCP } from "../network/send";
import { getOurPlayer } from "../players";
import { getSkeldRoom } from "../stageAPI";
import { shouldShowActionButton } from "./actionSubroutines";

const REPORT_DISTANCE = 60;

export function ableToReportDeadBody(): boolean {
  const ourPlayer = getOurPlayer();

  return (
    g.game !== null &&
    g.game.ventState === VentState.NONE &&
    ourPlayer !== undefined &&
    ourPlayer.alive &&
    shouldShowActionButton() &&
    isDeadBodyClose()
  );
}

function isDeadBodyClose() {
  const player = Isaac.GetPlayer();
  const closestDeadBody = getClosestDeadBody();
  if (closestDeadBody === undefined) {
    return false;
  }

  const bodyPosition = Vector(closestDeadBody.x, closestDeadBody.y);
  const distance = player.Position.Distance(bodyPosition);
  return distance <= REPORT_DISTANCE;
}

function getClosestDeadBody(): PlayerBody | undefined {
  if (g.game === null) {
    return undefined;
  }

  const player = Isaac.GetPlayer();
  const room = getSkeldRoom();
  const bodiesInThisRoom = g.game.bodies.filter((body) => body.room === room);
  if (bodiesInThisRoom.length === 0) {
    return undefined;
  }

  let closestBody: PlayerBody | undefined;
  let closestDistance = math.huge;
  for (const body of bodiesInThisRoom) {
    const position = Vector(body.x, body.y);
    const distance = player.Position.Distance(position);

    if (distance < closestDistance) {
      closestBody = body;
      closestDistance = distance;
    }
  }

  return closestBody;
}

export function reportDeadBody(): void {
  if (g.game === null) {
    return;
  }

  const closestBody = getClosestDeadBody();
  if (closestBody === undefined) {
    return;
  }

  sendTCP(SocketCommandModToServer.MEETING, {
    gameID: g.game.id,
    userIDKilled: closestBody.userID,
    meetingType: MeetingType.REPORT_BODY,
  });
}
