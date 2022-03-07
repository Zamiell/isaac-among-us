import { IS_DEV, MAX_PLAYERS, taskDescriptions } from "../constants";
import g from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { getStageAPIRoomName } from "../stageAPISubroutines";
import { drawFontText } from "../utils";
import { isConsoleOpen } from "./console";
import { inCutscene } from "./cutscene";
import { inEndMeeting } from "./endMeeting";
import { inLobby } from "./lobby";

const TEXT_GRID_INDEX = 7;
const SECOND_LINE_OFFSET = Vector(0, 20);

export function postRender(): void {
  if (
    StageAPI === undefined ||
    g.game === null ||
    g.game.meeting !== null ||
    inCutscene() ||
    inEndMeeting() ||
    isConsoleOpen()
  ) {
    return;
  }

  const game = Game();
  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);

  if (g.game.currentTask !== null) {
    const taskDescription = taskDescriptions[g.game.currentTask];
    drawFontText(`Task: ${taskDescription.name}`, position);
    return;
  }

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
