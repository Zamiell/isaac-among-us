import { SocketCommandModToServer, SocketCommandModToServerData } from "common";
import { Game } from "./classes/Game";
import { commandMap } from "./commandMap";
import { sendError } from "./error";
import { getPlayer } from "./game";
import { games, getGameByName } from "./games";
import { ExtraCommandData } from "./interfaces/ExtraCommandData";
import { Socket } from "./interfaces/Socket";
import {
  validateAlphanumeric,
  validateAlphanumericHyphen,
  validateBoolean,
  validateInteger,
  validateMaxStringLength,
  validateMinStringLength,
  validateNumber,
  validateString,
} from "./validate";

const COMMANDS_ALLOWED_WHILE_NOT_LOGGED_IN: ReadonlySet<SocketCommandModToServer> =
  new Set([
    SocketCommandModToServer.PING,
    SocketCommandModToServer.CHECK_USERNAME,
    SocketCommandModToServer.LOGIN,
  ]);

const COMMANDS_WITH_NO_ASSOCIATED_GAME: ReadonlySet<SocketCommandModToServer> =
  new Set([
    ...COMMANDS_ALLOWED_WHILE_NOT_LOGGED_IN,
    SocketCommandModToServer.GAME_LIST,
    SocketCommandModToServer.CREATE,
    SocketCommandModToServer.JOIN,
  ]);

// Note that JOIN explicitly handles the game not being started, since an associated game is not a
// requirement for this command.
const COMMANDS_ALLOWED_WHILE_GAME_NOT_STARTED: ReadonlySet<SocketCommandModToServer> =
  new Set([
    SocketCommandModToServer.CREATE,
    SocketCommandModToServer.JOIN,
    SocketCommandModToServer.LEAVE,
    SocketCommandModToServer.START,
  ]);

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 15;
const MIN_GAME_NAME_LENGTH = 3;
const MAX_GAME_NAME_LENGTH = 15;
const MAX_CHAT_MSG_LENGTH = 300;

export function handleCommand(
  socket: Socket,
  possibleCommand: string,
  rawData: unknown,
): void {
  const command = possibleCommand as SocketCommandModToServer;
  const commandFunction = commandMap[command];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (commandFunction === undefined) {
    sendError(socket, `Invalid command: ${command}`);
    return;
  }

  if (command === SocketCommandModToServer.PING) {
    return;
  }

  const data = validate(socket, command, rawData);
  if (data === undefined) {
    return;
  }

  // Extra data is metadata about the request that the user did not explicitly send over the wire.
  const extraData = getExtraData(socket, data);
  if (!commandMatchesExtraData(socket, command, extraData)) {
    return;
  }

  // eslint-disable-next-line
  commandFunction(socket, data as any, extraData);
}

function validate(
  socket: Socket,
  command: SocketCommandModToServer,
  rawData: unknown,
): Record<string, unknown> | undefined {
  if (rawData === null || rawData === undefined) {
    sendError(socket, `You must specify data for the command: ${command}`);
    return undefined;
  }

  const ClassConstructor = SocketCommandModToServerData[command];
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (ClassConstructor === undefined) {
    sendError(
      socket,
      `Failed to find an internal data schema for the command: ${command}`,
    );
    return undefined;
  }

  const data = rawData as Record<string, unknown>;

  // Iterate over the reference class to see all of the fields that we are expecting.
  const instantiatedReferenceClass = new ClassConstructor();
  for (const key of Object.keys(instantiatedReferenceClass)) {
    // For all commands, uninitialized values are not allowed.
    const value = data[key];
    if (value === undefined || value === null) {
      sendError(socket, `You must specify a value for the field: ${key}`);
      return undefined;
    }

    // For all commands, empty strings are not allowed. (We also trim leading and trailing
    // whitespace to prevent confusion.)
    let modifiedValue = value;
    if (typeof value === "string") {
      modifiedValue = value.trim();
      // Hard code some exceptions, like for the "password" field.
      if (modifiedValue === "" && key !== "password") {
        sendError(socket, `You must specify a value for the field: ${key}`);
        return undefined;
      }
    }
    data[key] = modifiedValue;

    // A specific field may have additional validation requirements.
    const validateFunction = validateFunctionMap.get(key);
    if (validateFunction !== undefined) {
      if (!validateFunction(socket, key, modifiedValue)) {
        return undefined;
      }
    }
  }

  const commandRequiresToBeLoggedIn =
    !COMMANDS_ALLOWED_WHILE_NOT_LOGGED_IN.has(command);
  if (commandRequiresToBeLoggedIn && !socket.loggedIn) {
    sendError(
      socket,
      `You must login first before sending a "${command}" command.`,
    );
    return undefined;
  }

  return data;
}

const validateFunctionMap = new Map<
  string,
  (socket: Socket, key: string, value: unknown) => boolean
>();

validateFunctionMap.set(
  "username",
  (socket: Socket, key: string, value: unknown) => {
    if (!validateString(socket, key, value)) {
      return false;
    }

    const username = value as string;

    if (!validateMinStringLength(socket, key, username, MIN_USERNAME_LENGTH)) {
      return false;
    }

    if (!validateMaxStringLength(socket, key, username, MAX_USERNAME_LENGTH)) {
      return false;
    }

    if (!validateAlphanumeric(socket, key, username)) {
      return false;
    }

    return true;
  },
);

validateFunctionMap.set("password", validateString);

validateFunctionMap.set(
  "name",
  (socket: Socket, key: string, value: unknown) => {
    if (!validateString(socket, key, value)) {
      return false;
    }

    const username = value as string;

    if (!validateMinStringLength(socket, key, username, MIN_GAME_NAME_LENGTH)) {
      return false;
    }

    if (!validateMaxStringLength(socket, key, username, MAX_GAME_NAME_LENGTH)) {
      return false;
    }

    if (!validateAlphanumericHyphen(socket, key, username)) {
      return false;
    }

    return true;
  },
);

validateFunctionMap.set("created", validateBoolean);
validateFunctionMap.set("gameID", validateNumberAndInteger);

validateFunctionMap.set(
  "msg",
  (socket: Socket, key: string, value: unknown) => {
    if (!validateString(socket, key, value)) {
      return false;
    }

    const msg = value as string;

    if (!validateMaxStringLength(socket, key, msg, MAX_CHAT_MSG_LENGTH)) {
      return false;
    }

    return true;
  },
);

validateFunctionMap.set("room", validateNumberAndInteger);
validateFunctionMap.set("enterGridIndex", validateNumberAndInteger);
validateFunctionMap.set("userID", validateNumberAndInteger);
validateFunctionMap.set("x", validateNumber);
validateFunctionMap.set("y", validateNumber);
validateFunctionMap.set("meetingType", validateNumberAndInteger);
validateFunctionMap.set("userIDInitiated", validateNumberAndInteger);
validateFunctionMap.set("userIDKilled", validateNumberAndInteger);
validateFunctionMap.set("userIDVotedFor", validateNumberAndInteger);
validateFunctionMap.set("skip", validateBoolean);
validateFunctionMap.set("task", validateNumberAndInteger);

function validateNumberAndInteger(socket: Socket, key: string, value: unknown) {
  if (!validateNumber(socket, key, value)) {
    return false;
  }

  const number = value as number;

  if (!validateInteger(socket, key, number)) {
    return false;
  }

  return true;
}

function getExtraData(socket: Socket, data: Record<string, unknown>) {
  const extraData: ExtraCommandData = {};

  const { userID } = socket;
  if (userID === undefined) {
    return extraData;
  }

  // Find the associated game, if any.
  if (data["name"] !== undefined) {
    const name = data["name"] as string;
    extraData.game = getGameByName(name);
  } else if (data["gameID"] !== undefined) {
    const gameID = data["gameID"] as number;
    const game = games.get(gameID);
    if (game !== undefined) {
      extraData.game = game;
    }
  }

  // Find the associated player, if any.
  if (extraData.game !== undefined) {
    extraData.player = getPlayer(userID, extraData.game);
  }

  return extraData;
}

function commandMatchesExtraData(
  socket: Socket,
  command: SocketCommandModToServer,
  extraData: ExtraCommandData,
) {
  const { game, player } = extraData;

  const commandRequiresAGame = !COMMANDS_WITH_NO_ASSOCIATED_GAME.has(command);
  if (commandRequiresAGame && game === undefined) {
    sendError(socket, "There is not a game with the provided game ID or name.");
    return false;
  }

  if (game === undefined) {
    return true;
  }

  if (
    player === undefined &&
    command !== SocketCommandModToServer.CREATE &&
    command !== SocketCommandModToServer.JOIN
  ) {
    sendError(
      socket,
      `You are not in game ${game.id}, so you cannot perform a "${command}" command.`,
    );
    return false;
  }

  return commandMatchesGameStartedState(socket, command, game);
}

function commandMatchesGameStartedState(
  socket: Socket,
  command: SocketCommandModToServer,
  game: Game,
) {
  // Chat can be sent regardless of whether the game is started or not.
  if (command === SocketCommandModToServer.CHAT) {
    return true;
  }

  const commandRequiredGameStarted =
    !COMMANDS_ALLOWED_WHILE_GAME_NOT_STARTED.has(command);

  if (commandRequiredGameStarted && !game.started) {
    sendError(
      socket,
      `Game ${game.id} is not started, so you cannot send a "${command}" command.`,
    );
    return false;
  }

  if (!commandRequiredGameStarted && game.started) {
    sendError(
      socket,
      `Game ${game.id} is already started, so you cannot send a "${command}" command.`,
    );
    return false;
  }

  return true;
}

export function ensureAllCommandDataFieldsHaveValidatorFunctions(): void {
  for (const ClassConstructor of Object.values(SocketCommandModToServerData)) {
    const instantiatedReferenceClass = new ClassConstructor();
    for (const key of Object.keys(instantiatedReferenceClass)) {
      const validateFunction = validateFunctionMap.get(key);
      if (validateFunction === undefined) {
        throw new Error(
          `Failed to find a validator function for field: ${key}`,
        );
      }
    }
  }
}
