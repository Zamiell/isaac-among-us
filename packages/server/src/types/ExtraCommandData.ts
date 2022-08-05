import { Game } from "./Game";
import { Player } from "./Player";

export interface ExtraCommandData {
  /**
   * The game associated with this command, corresponding to the submitted "gameID" or "name" field.
   * Equal to undefined if a matching game was not found.
   */
  game?: Game;

  /**
   * The player object that matches the user who submitted the command. Equal to undefined if the
   * user is not in the game.
   */
  player?: Player;
}
