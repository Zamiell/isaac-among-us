import { error } from "./error";
import { isPlayerOwner } from "./game";
import { isUserInAnyGames } from "./games";
import { Game } from "./types/Game";
import { Socket } from "./types/Socket";

export function validateString(
  socket: Socket,
  key: string,
  value: unknown,
): boolean {
  if (typeof value !== "string") {
    error(socket, `The "${key}" field must be a string.`);
    return false;
  }

  return true;
}

export function validateMinStringLength(
  socket: Socket,
  key: string,
  value: string,
  minLength: number,
): boolean {
  if (value.length < minLength) {
    error(
      socket,
      `The "${key}" field must be at least ${minLength} characters long.`,
    );
    return false;
  }

  return true;
}

export function validateMaxStringLength(
  socket: Socket,
  key: string,
  value: string,
  maxLength: number,
): boolean {
  if (value.length > maxLength) {
    error(
      socket,
      `The "${key}" field cannot be longer than ${maxLength} characters.`,
    );
    return false;
  }

  return true;
}

export function validateAlphanumeric(
  socket: Socket,
  key: string,
  value: string,
): boolean {
  if (/^[a-z0-9]+$/i.exec(value) === null) {
    error(socket, `The "${key}" field must be alphanumeric.`);
    return false;
  }

  return true;
}

export function validateNumber(
  socket: Socket,
  key: string,
  value: unknown,
): boolean {
  if (typeof value !== "number") {
    error(socket, `The "${key}" field must be a number.`);
    return false;
  }

  return true;
}

export function validateInteger(
  socket: Socket,
  key: string,
  value: number,
): boolean {
  if (!Number.isInteger(value)) {
    error(socket, `The "${key}" field must be an integer.`);
    return false;
  }

  return true;
}

export function validateBoolean(
  socket: Socket,
  key: string,
  value: unknown,
): boolean {
  if (typeof value !== "boolean") {
    error(socket, `The "${key}" field must be a boolean.`);
    return false;
  }

  return true;
}

export function validateInNoGames(socket: Socket, verb: string): boolean {
  const { userID } = socket;

  if (userID === null) {
    return false;
  }

  if (isUserInAnyGames(userID)) {
    error(socket, `You are already in a game, so you cannot ${verb} one.`);
    return false;
  }

  return true;
}

export function validateGameOwner(
  socket: Socket,
  game: Game,
  verb: string,
): boolean {
  const { userID } = socket;

  if (userID === null) {
    return false;
  }

  if (!isPlayerOwner(userID, game)) {
    const firstPlayer = game.players[0];
    const ownerName =
      firstPlayer === undefined ? "unknown" : firstPlayer.username;
    error(
      socket,
      `You are not the owner of game ${game.id}; only ${ownerName} can ${verb} it.`,
    );
    return false;
  }

  return true;
}
