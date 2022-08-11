import { Meeting, PlayerBody } from "common";
import { Player } from "./Player";

export class Game {
  id: number;
  name: string;
  players: Player[] = [];
  started = false;
  impostorUserIDs: number[] = [];
  meeting: Meeting | null = null;
  bodies: PlayerBody[] = [];

  /** How many rounds of play there have been. */
  night = 1;

  emergencyButtonCooldown = true;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
