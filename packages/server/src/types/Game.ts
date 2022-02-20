import { Meeting } from "./Meeting";
import { Player } from "./Player";

export class Game {
  id: number;
  name: string;
  players: Player[] = [];
  started = false;
  impostors: number[] = [];
  meeting: Meeting | null = null;
  playersKilledSinceLastMeeting: number[] = [];

  /** How many rounds of play there have been. */
  night = 1;

  emergencyButtonCooldown = true;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
