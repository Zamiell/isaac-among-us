import { AmongUsGame } from "./AmongUsGame";

export class Globals {
  g = Game();

  loggedIn = false;
  userID: int | null = null;
  username: string | null = null;
  game: AmongUsGame | null = null;
}
