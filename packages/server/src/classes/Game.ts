import type { Meeting, PlayerBody } from "common";
import type { Player } from "./Player.js";

export class Game {
  id: number;
  name: string;
  password: string | null;
  players: Player[] = [];
  ownerUserID: number;
  started = false;
  impostorUserIDs: number[] = [];
  meeting: Meeting | null = null;
  bodies: PlayerBody[] = [];

  /** How many rounds of play there have been. */
  night = 1;

  emergencyButtonOnCooldown = true;

  constructor(
    id: number,
    name: string,
    password: string | null,
    ownerUserID: number,
  ) {
    this.id = id;
    this.name = name;
    this.password = password;
    this.ownerUserID = ownerUserID;
  }
}
