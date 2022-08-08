import { Game } from "./classes/Game";

export function logGameEvent(game: Game, msg: string): void {
  console.log(`Game ${game.id} - ${game.name} - ${msg}`);
}
