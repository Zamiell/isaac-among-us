import { getGridEntities, getRoomSafeGridIndex, log } from "isaacscript-common";
import { debugFunction, debugFunction2 } from "../debugFunction";
import { skeldRoomReverseMap } from "../skeldRoomMap";
import { goToStageAPIRoom } from "../stageAPI";
import { SkeldRoom } from "../types/SkeldRoom";
import { removeGridEntity } from "../util";
import { list } from "./executeCmdSubroutines";

export function main(command: string, parameters: string): void {
  // Record every command
  let debugString = `MC_EXECUTE_CMD - ${command}`;
  if (parameters !== "") {
    debugString += ` ${parameters}`;
  }
  log(debugString);

  const lowercaseCommand = command.toLowerCase();
  const executeCmdFunction = functionMap.get(lowercaseCommand);
  if (executeCmdFunction !== undefined) {
    executeCmdFunction(parameters);
  } else {
    print("Unknown vanilla or Among Us command.");
  }
}

const functionMap = new Map<string, (params: string) => void>();

functionMap.set("center", () => {
  const game = Game();
  const room = game.GetRoom();
  const centerPos = room.GetCenterPos();
  const player = Isaac.GetPlayer();

  player.Position = centerPos;
});

functionMap.set("debug", () => {
  debugFunction();
});

functionMap.set("debug2", () => {
  debugFunction2();
});

functionMap.set("list", (_params: string) => {
  list();
});

functionMap.set("listall", (_params: string) => {
  list(true);
});

functionMap.set("pos", () => {
  const player = Isaac.GetPlayer();
  print(`Player position: (${player.Position.X}, ${player.Position.Y})`);
});

functionMap.set("w", (params: string) => {
  let roomName: string | undefined;
  const num = tonumber(params);
  if (num === undefined) {
    roomName = params;
  } else {
    const skeldRoom = num as SkeldRoom;
    roomName = skeldRoomReverseMap[skeldRoom];
    if (roomName === undefined) {
      print(`Failed to find the room name for room ID: ${skeldRoom}`);
      return;
    }
  }

  goToStageAPIRoom(roomName);
  print(`Warped to room: ${roomName}`);
});

functionMap.set("removeallgrid", () => {
  for (const gridEntity of getGridEntities()) {
    removeGridEntity(gridEntity);
  }
});

functionMap.set("roomindex", () => {
  const roomSafeGridIndex = getRoomSafeGridIndex();
  print(roomSafeGridIndex);
});
