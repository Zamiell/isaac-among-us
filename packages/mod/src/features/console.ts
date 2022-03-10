import {
  disableAllInputs,
  enableAllInputs,
  game,
  getEnumValues,
  ISAAC_FRAMES_PER_SECOND,
  isKeyboardPressed,
  saveDataManager,
} from "isaacscript-common";
import * as chat from "../chat";
import { chatCommandFunctions } from "../chatCommandFunctions";
import { MOD_NAME } from "../constants";
import g from "../globals";
import { KEYBOARD_MAP } from "../keyboardMap";
import { sendTCP } from "../network/send";
import * as socketClient from "../network/socketClient";
import { Colors } from "../types/Colors";
import { SocketCommandModToServer } from "../types/SocketCommands";
import { getScreenPosition } from "../utils";
import { drawText } from "./drawText";

export const SPACING_FROM_LEFT_EDGE = 0.167;
const SPACING_FROM_LEFT_EDGE_CLOSER = 0.02;
const SPACING_FROM_TOP_EDGE = 0.6;
export const CONSOLE_POSITION = getScreenPosition(
  SPACING_FROM_LEFT_EDGE,
  SPACING_FROM_TOP_EDGE,
);
export const CONSOLE_POSITION_LEFT = getScreenPosition(
  SPACING_FROM_LEFT_EDGE_CLOSER,
  SPACING_FROM_TOP_EDGE,
);
const MAX_HISTORY_LENGTH = 100;
const REPEAT_KEY_DELAY_IN_RENDER_FRAMES = ISAAC_FRAMES_PER_SECOND * 0.5;
const COMMAND_PREFIX = "/";
const OFFLINE_COMMANDS: ReadonlySet<string> = new Set([
  "help",
  "connect",
  "echo",
]);

let consoleOpen = false;
let inputText = "";
let inputTextIndex = 0;
let savedText = ""; // Used to save a partially completed message when recalling history
let historyIndex = -1;

/** Values are the Isaac frame that the key was pressed. */
const keysPressed = new Map<Keyboard, int>();

const v = {
  persistent: {
    inputHistory: [] as string[],
  },
};

export function init(): void {
  saveDataManager("console", v);
}

// ModCallbacks.MC_POST_RENDER (2)
export function postRender(): void {
  const isPaused = game.IsPaused();
  const isaacFrameCount = Isaac.GetFrameCount();

  if (isPaused) {
    return;
  }

  if (ModConfigMenu !== undefined && ModConfigMenu.IsVisible) {
    return;
  }

  if (!consoleOpen) {
    checkKeyboardInput(Keyboard.KEY_ENTER, isaacFrameCount);
    checkKeyboardInput(Keyboard.KEY_SLASH, isaacFrameCount);
    return;
  }

  checkAllKeyboardInput(isaacFrameCount);
  drawConsole();
}

function checkAllKeyboardInput(isaacFrameCount: int) {
  for (const keyboardValue of getEnumValues(Keyboard)) {
    checkKeyboardInput(keyboardValue, isaacFrameCount);
  }
}

function checkKeyboardInput(keyboardValue: Keyboard, isaacFrameCount: int) {
  const pressed = isKeyboardPressed(keyboardValue);
  if (!pressed) {
    keysPressed.delete(keyboardValue);
    return;
  }

  let framePressed = keysPressed.get(keyboardValue);
  if (framePressed === undefined) {
    framePressed = isaacFrameCount;
    keysPressed.set(keyboardValue, framePressed);
  }

  // We want the key to be repeated if they are holding down the key (after a short delay)
  const pressedOnThisFrame = framePressed === isaacFrameCount;
  const framesSinceKeyPressed = isaacFrameCount - framePressed;
  const shouldTriggerRepeatPress =
    framesSinceKeyPressed > REPEAT_KEY_DELAY_IN_RENDER_FRAMES &&
    framesSinceKeyPressed % 2 === 0; // Every other frame
  const shouldPress = pressedOnThisFrame || shouldTriggerRepeatPress;

  if (shouldPress) {
    keyPressed(keyboardValue);
  }
}

function keyPressed(keyboardValue: Keyboard) {
  // Do nothing if modifiers other than shift are pressed
  if (
    keysPressed.has(Keyboard.KEY_LEFT_CONTROL) ||
    keysPressed.has(Keyboard.KEY_RIGHT_CONTROL) ||
    keysPressed.has(Keyboard.KEY_LEFT_ALT) ||
    keysPressed.has(Keyboard.KEY_RIGHT_ALT) ||
    keysPressed.has(Keyboard.KEY_LEFT_SUPER) ||
    keysPressed.has(Keyboard.KEY_RIGHT_SUPER)
  ) {
    return;
  }

  const keyFunction = keyFunctionMap.get(keyboardValue);
  if (keyFunction !== undefined && !isShiftPressed()) {
    keyFunction();
    return;
  }

  const keyStringArray = KEYBOARD_MAP.get(keyboardValue);
  if (keyStringArray !== undefined) {
    insertNewCharacter(keyStringArray);
  }
}

function isShiftPressed() {
  return (
    keysPressed.has(Keyboard.KEY_LEFT_SHIFT) ||
    keysPressed.has(Keyboard.KEY_RIGHT_SHIFT)
  );
}

function insertNewCharacter(keyStringArray: [string, string]) {
  const [lowercaseCharacter, uppercaseCharacter] = keyStringArray;
  const character = isShiftPressed() ? uppercaseCharacter : lowercaseCharacter;
  const front = inputText.slice(0, inputTextIndex);
  const back = inputText.slice(inputTextIndex);
  inputText = `${front}${character}${back}`;
  inputTextIndex += 1;
}

function open() {
  consoleOpen = true;
  disableAllInputs(MOD_NAME);
  AwaitingTextInput = true;
}

function close(execute = true) {
  consoleOpen = false;
  enableAllInputs(MOD_NAME);
  AwaitingTextInput = false;

  if (!execute || inputText === "") {
    savedText = "";
    historyIndex = -1;
    return;
  }

  executeChatCommand(inputText);
  appendHistory();
  inputText = "";
  inputTextIndex = 0;
  savedText = "";
  historyIndex = -1;
}

function executeChatCommand(msg: string) {
  if (!msg.startsWith(COMMAND_PREFIX)) {
    if (g.game === null) {
      chat.addLocal("You must be in a game to chat with other players.");
      return;
    }

    sendTCP(SocketCommandModToServer.CHAT, {
      gameID: g.game.id,
      msg,
    });

    return;
  }

  msg = msg.slice(COMMAND_PREFIX.length);
  const segments = msg.split(" ");
  const command = segments.shift();
  if (command === undefined) {
    return;
  }
  const lowercaseCommand = command.toLowerCase();
  const args = [...segments];

  const chatCommandFunction = chatCommandFunctions.get(lowercaseCommand);
  if (chatCommandFunction === undefined) {
    chat.addLocal(`Unknown command: ${command}`);
    return;
  }

  const onlineCommand = !OFFLINE_COMMANDS.has(lowercaseCommand);
  if (onlineCommand && !socketClient.isConnected()) {
    chat.addLocal(
      `You can only perform this command when connected to the ${MOD_NAME} server.`,
    );
    return;
  }

  chatCommandFunction(args);
}

function appendHistory() {
  if (v.persistent.inputHistory.length > 0) {
    const lastHistory = v.persistent.inputHistory[0];
    if (inputText === lastHistory) {
      return;
    }
  }

  v.persistent.inputHistory.unshift(inputText);
  if (v.persistent.inputHistory.length >= MAX_HISTORY_LENGTH) {
    v.persistent.inputHistory.pop();
  }
}

function drawConsole() {
  // We check to see if the console is open again in case it was opened on this frame
  if (!consoleOpen) {
    return;
  }

  const front = inputText.slice(0, inputTextIndex);
  const back = inputText.slice(inputTextIndex);
  const text = `>${front}${Colors.YELLOW}|${Colors.WHITE}${back}`;
  const position =
    g.game?.meeting !== null ? CONSOLE_POSITION_LEFT : CONSOLE_POSITION;
  drawText(text, position);
}

const keyFunctionMap = new Map<Keyboard, () => void>();

// 256
keyFunctionMap.set(Keyboard.KEY_ESCAPE, () => {
  close(false);
});

// 257
keyFunctionMap.set(Keyboard.KEY_ENTER, () => {
  if (consoleOpen) {
    close();
  } else {
    open();
  }
});

// 258
keyFunctionMap.set(Keyboard.KEY_TAB, () => {
  if (!inputText.startsWith(COMMAND_PREFIX)) {
    return;
  }

  const partialCommand = inputText.slice(COMMAND_PREFIX.length);
  const commands = chatCommandFunctions.keys();
  for (const command of commands) {
    if (command.startsWith(partialCommand)) {
      inputText = COMMAND_PREFIX + command;
      inputTextIndex = inputText.length;
      return;
    }
  }
});

// 259
keyFunctionMap.set(Keyboard.KEY_BACKSPACE, () => {
  if (inputTextIndex === 0) {
    return;
  }

  const front = inputText.slice(0, inputTextIndex);
  const back = inputText.slice(inputTextIndex);
  const frontWithLastCharRemoved = front.slice(0, -1);
  inputText = frontWithLastCharRemoved + back;
  inputTextIndex -= 1;
});

// 262
keyFunctionMap.set(Keyboard.KEY_RIGHT, () => {
  if (inputTextIndex === inputText.length) {
    return;
  }

  inputTextIndex += 1;
});

// 263
keyFunctionMap.set(Keyboard.KEY_LEFT, () => {
  if (inputTextIndex === 0) {
    return;
  }

  inputTextIndex -= 1;
});

// 264
keyFunctionMap.set(Keyboard.KEY_DOWN, () => {
  if (historyIndex === -1) {
    return;
  }

  historyIndex -= 1;

  if (historyIndex === -1) {
    inputText = savedText;
    inputTextIndex = savedText.length;
    return;
  }

  const inputHistoryText = v.persistent.inputHistory[historyIndex];
  if (inputHistoryText === undefined) {
    return;
  }

  inputText = inputHistoryText;
  inputTextIndex = inputHistoryText.length;
});

// 265
keyFunctionMap.set(Keyboard.KEY_UP, () => {
  if (historyIndex === -1) {
    savedText = inputText;
  }

  if (historyIndex >= MAX_HISTORY_LENGTH) {
    return;
  }

  const newHistoryIndex = historyIndex + 1;
  if (newHistoryIndex >= v.persistent.inputHistory.length) {
    return;
  }

  historyIndex = newHistoryIndex;
  const inputHistoryText = v.persistent.inputHistory[historyIndex];
  if (inputHistoryText === undefined) {
    return;
  }

  inputText = inputHistoryText;
  inputTextIndex = inputHistoryText.length;
});

// 268
keyFunctionMap.set(Keyboard.KEY_HOME, () => {
  inputTextIndex = 0;
});

// 269
keyFunctionMap.set(Keyboard.KEY_END, () => {
  inputTextIndex = inputText.length;
});

// 47
keyFunctionMap.set(Keyboard.KEY_SLASH, () => {
  if (consoleOpen) {
    insertNewCharacter(["/", "/"]);
  } else {
    open();
    inputText = "/";
    inputTextIndex = 1;
  }
});

export function isConsoleOpen(): boolean {
  return consoleOpen;
}
