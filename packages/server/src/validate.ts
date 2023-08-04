import type { Game } from "./classes/Game.js";
import { sendError } from "./error.js";
import { getOwner } from "./game.js";
import { isUserInAnyGames } from "./games.js";
import type { Socket } from "./interfaces/Socket.js";

export function validateString(
  socket: Socket,
  key: string,
  value: unknown,
): boolean {
  if (typeof value !== "string") {
    sendError(socket, `The "${key}" field must be a string.`);
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
    sendError(
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
    sendError(
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
  if (/^[\da-z]+$/i.exec(value) === null) {
    sendError(socket, `The "${key}" field must be alphanumeric.`);
    return false;
  }

  return true;
}

export function validateAlphanumericHyphen(
  socket: Socket,
  key: string,
  value: string,
): boolean {
  if (/^[\da-z-]+$/i.exec(value) === null) {
    sendError(
      socket,
      `The "${key}" field must be alphanumeric. (Hyphens are also allowed.)`,
    );
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
    sendError(socket, `The "${key}" field must be a number.`);
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
    sendError(socket, `The "${key}" field must be an integer.`);
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
    sendError(socket, `The "${key}" field must be a boolean.`);
    return false;
  }

  return true;
}

export function validateInNoGames(socket: Socket, verb: string): boolean {
  const { userID } = socket;

  if (userID === undefined) {
    return false;
  }

  if (isUserInAnyGames(userID)) {
    sendError(socket, `You are already in a game, so you cannot ${verb} one.`);
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

  if (userID === undefined) {
    return false;
  }

  if (userID !== game.ownerUserID) {
    const owner = getOwner(game);
    sendError(
      socket,
      `You are not the owner of game ${game.id}; only ${owner.username} can ${verb} it.`,
    );
    return false;
  }

  return true;
}
