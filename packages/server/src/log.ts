import { Game } from "./types/Game";

export function logGameEvent(game: Game, msg: string): void {
  console.log(`Game ${game.id} - ${game.name} - ${msg}`);
}
