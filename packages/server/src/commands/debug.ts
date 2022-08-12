import { NoData, Role } from "common";
import { ExtraCommandData } from "../interfaces/ExtraCommandData";
import { Socket } from "../interfaces/Socket";

export function commandDebug(
  _socket: Socket,
  _data: NoData,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (game === undefined) {
    return;
  }

  console.log(`Game: ${game.name} (${game.id})`);
  console.log(`- started: ${game.started}`);
  console.log("- impostors:", game.impostorUserIDs);
  console.log(`- numImpostors: ${game.impostorUserIDs.length}`);
  console.log("- meeting:", game.meeting);
  console.log("- bodies:", game.bodies);
  console.log(`- night: ${game.night}`);
  console.log(`- emergencyButtonCooldown: ${game.emergencyButtonOnCooldown}`);

  console.log("Players:");
  game.players.forEach((player, i) => {
    console.log(`${i + 1} - ${player.username} (${player.userID})`);
    console.log(`    - connected: ${player.connected}`);
    console.log(`    - role: ${Role[player.role]} (${player.role})`);
    console.log(`    - character: ${player.character}`);
    console.log(`    - alive: ${player.alive}`);
    console.log(`    - room: ${player.room}`);
    console.log(`    - enterGridIndex: ${player.enterGridIndex}`);
    console.log(`    - usedEmergencyMeeting: ${player.usedEmergencyMeeting}`);
    console.log("    - tasks:");
    console.log("        - short:", player.tasks.short);
    console.log("        - long:", player.tasks.long);
    console.log("        - common:", player.tasks.common);
  });
}
