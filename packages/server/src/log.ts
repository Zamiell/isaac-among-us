import type { Game } from "./classes/Game.js";

export function logGameEvent(game: Game, msg: string): void {
  console.log(`Game ${game.id} - ${game.name} - ${msg}`);
}
