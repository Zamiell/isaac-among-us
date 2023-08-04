import { Role, SocketCommandModToServer } from "common";
import { VentState } from "../enums/VentState";
import { g } from "../globals";
import type { PlayerData } from "../interfaces/PlayerData";
import { sendTCP } from "../network/send";
import { getOurPlayer } from "../players";
import { getSkeldRoom } from "../stageAPI";
import { shouldShowActionButton } from "./actionSubroutines";

const KILL_DISTANCE = 60;

export function ableToKillAPlayer(): boolean {
  const ourPlayer = getOurPlayer();

  return (
    g.game !== null &&
    g.game.role === Role.IMPOSTER &&
    g.game.ventState === VentState.NONE &&
    ourPlayer !== undefined &&
    ourPlayer.alive &&
    shouldShowActionButton() &&
    isCrewMemberClose()
  );
}

function isCrewMemberClose() {
  const player = Isaac.GetPlayer();
  const closestAliveCrewMember = getClosestAliveCrewMember();
  if (closestAliveCrewMember === undefined) {
    return false;
  }

  const crewMemberPosition = Vector(
    closestAliveCrewMember.x,
    closestAliveCrewMember.y,
  );
  const distance = player.Position.Distance(crewMemberPosition);
  return distance <= KILL_DISTANCE;
}

function getClosestAliveCrewMember(): PlayerData | undefined {
  if (g.game === null) {
    return undefined;
  }

  const player = Isaac.GetPlayer();
  const room = getSkeldRoom();

  const otherPlayersData = [...g.game.playerMap.values()];
  const aliveCrewMembersInRoom = otherPlayersData.filter((otherPlayerData) => {
    if (g.game === null) {
      return false;
    }

    const playerDescription = g.game.getPlayerFromUserID(
      otherPlayerData.userID,
    );

    return (
      playerDescription !== undefined &&
      playerDescription.alive &&
      !g.game.isImposter(playerDescription.userID) &&
      otherPlayerData.room === room
    );
  });

  let closestCrewMember: PlayerData | undefined;
  let closestDistance = math.huge;
  for (const otherPlayerData of aliveCrewMembersInRoom) {
    const otherPlayerPosition = Vector(otherPlayerData.x, otherPlayerData.y);
    const distance = otherPlayerPosition.Distance(player.Position);
    if (distance < closestDistance) {
      closestCrewMember = otherPlayerData;
      closestDistance = distance;
    }
  }

  return closestCrewMember;
}

export function kill(): void {
  if (g.game === null) {
    return;
  }

  const closestAliveCrewMember = getClosestAliveCrewMember();
  if (closestAliveCrewMember === undefined) {
    return;
  }

  sendTCP(SocketCommandModToServer.KILL, {
    gameID: g.game.id,
    userIDKilled: closestAliveCrewMember.userID,
    room: closestAliveCrewMember.room,
    x: closestAliveCrewMember.x,
    y: closestAliveCrewMember.y,
  });
}
