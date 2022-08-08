import { EntityCollisionClass } from "isaac-typescript-definitions";
import {
  DISTANCE_OF_GRID_TILE,
  getCircleDiscretizedPoints,
} from "isaacscript-common";
import { SkeldRoom } from "../enums/SkeldRoom";
import g from "../globals";
import { setMinimapAPIEnabled } from "../minimapAPI";
import { getOurPlayerIndex } from "../players";
import { CENTER_TABLE_GRID_INDEX } from "../rooms/cafeteria";
import { getSkeldRoom, goToStageAPIRoom } from "../stageAPI";
import { removeEmergencyButton, spawnEmergencyButton } from "./emergencyButton";

// In order for the players to be properly centered, we must offset the players downwards slightly.
const MEETING_CENTER_OFFSET = Vector(0, 10);
const MEETING_CIRCLE_RADIUS = DISTANCE_OF_GRID_TILE * 4;
const MEETING_CIRCLE_Y_MULTIPLIER = 0.75;

export function setupMeeting(meetingEnded: boolean): void {
  if (g.game === null) {
    return;
  }

  const room = getSkeldRoom();
  if (room !== SkeldRoom.CAFETERIA) {
    goToStageAPIRoom("Cafeteria");
  }

  setMinimapAPIEnabled(meetingEnded);
  enablePlayer(meetingEnded);
  enableButton(meetingEnded);
}

function enablePlayer(enable: boolean) {
  if (g.game === null || g.userID === null) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const centerPos = room.GetGridPosition(CENTER_TABLE_GRID_INDEX);
  const ourPlayerIndex = getOurPlayerIndex();
  const circlePoints = getMeetingCirclePoints();
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const endMeetingPos = circlePoints[ourPlayerIndex]!;
  const player = Isaac.GetPlayer();

  // Make the player invisible so that the camera is centered; we will draw a sprite representing
  // the player.
  player.Visible = enable;
  player.EntityCollisionClass = enable
    ? EntityCollisionClass.ALL
    : EntityCollisionClass.NONE;
  player.Position = enable ? endMeetingPos : centerPos;
}

function enableButton(enable: boolean) {
  if (enable) {
    spawnEmergencyButton();
  } else {
    removeEmergencyButton();
  }
}

export function getMeetingCirclePoints(): Vector[] {
  if (g.game === null) {
    error("Failed to get the meeting circle points since the game is null.");
  }

  const game = Game();
  const room = game.GetRoom();
  const centerTablePos = room.GetGridPosition(CENTER_TABLE_GRID_INDEX);
  const meetingCenterPos = centerTablePos.add(MEETING_CENTER_OFFSET);

  return getCircleDiscretizedPoints(
    meetingCenterPos,
    MEETING_CIRCLE_RADIUS,
    g.game.players.length,
    1,
    MEETING_CIRCLE_Y_MULTIPLIER,
  );
}
