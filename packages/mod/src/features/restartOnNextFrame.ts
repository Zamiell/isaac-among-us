import g from "../globals";
import { consoleCommand } from "../util";

const AMONG_US_CHARACTER = PlayerType.PLAYER_ISAAC;
const AMONG_US_SEED = "L8AK PRCH"; // H4C8 QKT3 // cspell:disable-line
const AMONG_US_CHALLENGE = Challenge.CHALLENGE_NULL;

let restartOnNextFrame = false;

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  if (!restartOnNextFrame) {
    return;
  }
  restartOnNextFrame = false;

  if (!validateChallenge()) {
    consoleCommand(`challenge ${AMONG_US_CHALLENGE}`);
  }

  if (!validateCharacter()) {
    consoleCommand(`restart ${AMONG_US_CHARACTER}`);
  }

  if (!validateSeed()) {
    consoleCommand(`seed ${AMONG_US_SEED}`);
  }
}

// ModCallbacks.MC_POST_GAME_STARTED (15)
export function postGameStarted(): void {
  if (g.game === null) {
    return;
  }

  if (!validateChallenge() || !validateCharacter() || !validateSeed()) {
    restartOnNextFrame = true;
  }
}

function validateChallenge() {
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.CHALLENGE_NULL;
}

function validateCharacter() {
  const player = Isaac.GetPlayer();
  const character = player.GetPlayerType();

  return character === AMONG_US_CHARACTER;
}

function validateSeed() {
  const game = Game();
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();

  return startSeedString === AMONG_US_SEED;
}
