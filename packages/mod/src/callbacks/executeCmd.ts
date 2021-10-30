import { getRoomIndex, log } from "isaacscript-common";
import { debugFunction } from "../debugFunction";
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

functionMap.set("debug", () => {
  debugFunction();
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

functionMap.set("roomindex", () => {
  const roomIndex = getRoomIndex();
  print(roomIndex);
});
