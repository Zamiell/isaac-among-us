import { Meeting, PlayerBody } from "common";
import { Player } from "./Player";

export class Game {
  id: number;
  name: string;
  password: string | null;
  players: Player[] = [];
  started = false;
  impostorUserIDs: number[] = [];
  meeting: Meeting | null = null;
  bodies: PlayerBody[] = [];

  /** How many rounds of play there have been. */
  night = 1;

  emergencyButtonOnCooldown = true;

  constructor(id: number, name: string, password: string | null) {
    this.id = id;
    this.name = name;
    this.password = password;
  }
}
