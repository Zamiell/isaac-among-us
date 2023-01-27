import { FAKE_TASK, MAX_PLAYERS, TASK_DESCRIPTIONS } from "common";
import { game } from "isaacscript-common";
import { g } from "../globals";
import { getSkeldRoom } from "../stageAPI";
import { getStageAPIRoomName } from "../stageAPISubroutines";
import { drawFontText, inCutscene, inEndMeeting } from "../utils";
import { isConsoleOpen } from "./console";
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

  const room = game.GetRoom();
  const worldPosition = room.GetGridPosition(TEXT_GRID_INDEX);
  const position = Isaac.WorldToRenderPosition(worldPosition);

  if (g.game.currentTask === FAKE_TASK) {
    drawFontText("Fake Task", position);
    return;
  }

  if (g.game.currentTask !== null) {
    const taskDescription = TASK_DESCRIPTIONS[g.game.currentTask];
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
  if (roomName === undefined) {
    return;
  }

  const skeldRoom = getSkeldRoom();
  if (skeldRoom === undefined) {
    return;
  }

  /// const roomDescription = IS_DEV ? `${roomName} (${skeldRoom})` : roomName;
  const roomDescription = roomName;
  drawFontText(roomDescription, position);
}
