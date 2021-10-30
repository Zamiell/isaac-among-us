import { IS_DEV, MAX_PLAYERS } from "../constants";
import g from "../globals";
import { getSkeldRoom, getStageAPIRoomName } from "../stageAPI";
import { drawFontText } from "../util";
import { isConsoleOpen } from "./console";
import { inEndMeeting } from "./endMeeting";
import { inLobby } from "./lobby";

const TEXT_GRID_INDEX = 7;
const SECOND_LINE_OFFSET = Vector(0, 20);

export function postRender(): void {
  if (
    StageAPI === undefined ||
    g.game === null ||
    g.game.meeting !== null ||
    inEndMeeting() ||
    isConsoleOpen()
  ) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);

  if (inLobby()) {
    drawFontText("Lobby", position);
    const positionBelow = position.add(SECOND_LINE_OFFSET);
    drawFontText(`${g.game.players.length} / ${MAX_PLAYERS}`, positionBelow);
    return;
  }

  const roomName = getStageAPIRoomName();
  let skeldRoom = getSkeldRoom();
  if (room === null) {
    skeldRoom = -1;
  }
  const roomDescription = IS_DEV ? `${roomName} (${skeldRoom})` : roomName;
  drawFontText(roomDescription, position);
}
