import { Challenge, PlayerType } from "isaac-typescript-definitions";
import { game } from "isaacscript-common";
import { consoleCommand } from "../utils";

const AMONG_US_CHARACTER = PlayerType.ISAAC;
const AMONG_US_SEED = "P7W3 LEN1"; // cspell:disable-line
const AMONG_US_CHALLENGE = Challenge.NULL;

let restartOnNextRenderFrame = false;

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  if (!restartOnNextRenderFrame) {
    return;
  }
  restartOnNextRenderFrame = false;

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

// ModCallback.POST_GAME_STARTED (15)
export function postGameStarted(): boolean {
  if (!validateChallenge() || !validateCharacter() || !validateSeed()) {
    restartOnNextRenderFrame = true;
  }

  return restartOnNextRenderFrame;
}

function validateChallenge() {
  const challenge = Isaac.GetChallenge();

  return challenge === Challenge.NULL;
}

function validateCharacter() {
  const player = Isaac.GetPlayer();
  const character = player.GetPlayerType();

  return character === AMONG_US_CHARACTER;
}

function validateSeed() {
  const seeds = game.GetSeeds();
  const startSeedString = seeds.GetStartSeedString();

  return startSeedString === AMONG_US_SEED;
}
