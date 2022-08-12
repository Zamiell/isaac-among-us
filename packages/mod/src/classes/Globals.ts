import { Role } from "common";
import { CutsceneState } from "../enums/CutsceneState";
import { AmongUsGame } from "./AmongUsGame";

export class Globals {
  loggedIn = false;
  userID: int | null = null;
  username: string | null = null;
  game: AmongUsGame | null = null;
  welcomeNotificationEnabled = true;

  /**
   * Normally, event data is stored on the game object, but since the game is cleared in the middle
   * of the cutscene, we store data about the end-game sequence separately.
   */
  endGame = {
    state: CutsceneState.DISABLED,
    startRenderFrame: null as int | null,
    winningRole: Role.CREW,
    imposterNames: "",
  };
}
