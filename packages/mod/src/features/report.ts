import { MeetingType, PlayerBody, SocketCommandModToServer } from "common";
import { getScreenBottomRightPos } from "isaacscript-common";
import g from "../globals";
import { sendTCP } from "../network/send";
import { initSprite } from "../sprite";
import { getSkeldRoom } from "../stageAPI";
import { OTHER_UI_BUTTON_OFFSET } from "./connectedIcon";
import { ableToReportDeadBody } from "./reportSubroutines";

const sprite = initSprite("gfx/ui/report.anm2");

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (!ableToReportDeadBody()) {
    return;
  }

  drawReportUI();
}

function drawReportUI() {
  const bottomRightPos = getScreenBottomRightPos();
  const position = bottomRightPos.add(OTHER_UI_BUTTON_OFFSET);
  sprite.RenderLayer(0, position);
}

export function reportDeadBody(): void {
  if (g.game === null) {
    return;
  }

  const closestBody = getClosestBody();
  if (closestBody === undefined) {
    return;
  }

  sendTCP(SocketCommandModToServer.MEETING, {
    gameID: g.game.id,
    userIDKilled: closestBody.userID,
    meetingType: MeetingType.REPORT_BODY,
  });
}

function getClosestBody(): PlayerBody | undefined {
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
