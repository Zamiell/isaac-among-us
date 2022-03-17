import { ExtraCommandData } from "../types/ExtraCommandData";
import { Role } from "../types/Role";
import { Socket } from "../types/Socket";
import { NoData } from "../types/SocketCommands";

export function commandDebug(
  socket: Socket,
  _data: NoData,
  extraData: ExtraCommandData,
): void {
  const { game } = extraData;

  if (game === null) {
    return;
  }

  console.log(`Game: ${game.name} (${game.id})`);
  console.log(`- started: ${game.started}`);
  console.log("- impostors:", game.impostors);
  console.log(`- numImpostors: ${game.impostors.length}`);
  console.log("- meeting:", game.meeting);
  console.log("- bodies:", game.bodies);
  console.log(`- night: ${game.night}`);
  console.log(`- emergencyButtonCooldown: ${game.emergencyButtonCooldown}`);

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
