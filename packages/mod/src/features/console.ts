import { SocketCommandModToServer } from "common";
import { Keyboard } from "isaac-typescript-definitions";
import {
  game,
  getEnumValues,
  getMapPartialMatch,
  isKeyboardPressed,
  keyboardToString,
  ReadonlySet,
  RENDER_FRAMES_PER_SECOND,
} from "isaacscript-common";
import { addLocalChat } from "../chat";
import { chatCommandFunctionMap } from "../chatCommandFunctions";
import { MOD_NAME } from "../constants";
import { HexColors } from "../enums/HexColors";
import { g } from "../globals";
import { mod } from "../mod";
import { sendTCP } from "../network/send";
import * as socketClient from "../network/socketClient";
import { getScreenPosition, inCutscene } from "../utils";
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
const REPEAT_KEY_DELAY_IN_RENDER_FRAMES = RENDER_FRAMES_PER_SECOND * 0.5;
const COMMAND_PREFIX = "/";
const OFFLINE_COMMANDS = new ReadonlySet<string>(["help", "connect", "echo"]);

let consoleOpen = false;
let inputText = "";
let inputTextIndex = 0;
let savedText = ""; // Used to save a partially completed message when recalling history
let historyIndex = -1;

/** Values are the render frame that the key was pressed. */
const keysPressed = new Map<Keyboard, int>();

const v = {
  persistent: {
    inputHistory: [] as string[],
  },
};

export function init(): void {
  mod.saveDataManager("console", v);
}

// ModCallback.POST_RENDER (2)
export function postRender(): void {
  const isPaused = game.IsPaused();
  const renderFrameCount = Isaac.GetFrameCount();

  if (isPaused || inCutscene()) {
    return;
  }

  if (ModConfigMenu !== undefined && ModConfigMenu.IsVisible) {
    return;
  }

  if (!consoleOpen) {
    checkKeyboardInput(Keyboard.ENTER, renderFrameCount);
    checkKeyboardInput(Keyboard.SLASH, renderFrameCount);
    return;
  }

  checkAllKeyboardInput(renderFrameCount);
  drawConsole();
}

function checkAllKeyboardInput(renderFrameCount: int) {
  for (const keyboardValue of getEnumValues(Keyboard)) {
    checkKeyboardInput(keyboardValue, renderFrameCount);
  }
}

function checkKeyboardInput(keyboardValue: Keyboard, renderFrameCount: int) {
  const pressed = isKeyboardPressed(keyboardValue);
  if (!pressed) {
    keysPressed.delete(keyboardValue);
    return;
  }

  let renderFramePressed = keysPressed.get(keyboardValue);
  if (renderFramePressed === undefined) {
    renderFramePressed = renderFrameCount;
    keysPressed.set(keyboardValue, renderFramePressed);
  }

  // We want the key to be repeated if they are holding down the key (after a short delay).
  const pressedOnThisFrame = renderFramePressed === renderFrameCount;
  const renderFramesSinceKeyPressed = renderFrameCount - renderFramePressed;
  const shouldTriggerRepeatPress =
    renderFramesSinceKeyPressed > REPEAT_KEY_DELAY_IN_RENDER_FRAMES &&
    renderFramesSinceKeyPressed % 2 === 0; // Every other frame
  const shouldPress = pressedOnThisFrame || shouldTriggerRepeatPress;

  if (shouldPress) {
    keyPressed(keyboardValue);
  }
}

function keyPressed(keyboardValue: Keyboard) {
  // Do nothing if modifiers other than shift are pressed.
  if (
    keysPressed.has(Keyboard.LEFT_CONTROL) ||
    keysPressed.has(Keyboard.RIGHT_CONTROL) ||
    keysPressed.has(Keyboard.LEFT_ALT) ||
    keysPressed.has(Keyboard.RIGHT_ALT) ||
    keysPressed.has(Keyboard.LEFT_SUPER) ||
    keysPressed.has(Keyboard.RIGHT_SUPER)
  ) {
    return;
  }

  const keyFunction = keyFunctionMap.get(keyboardValue);
  if (keyFunction !== undefined && !isShiftPressed()) {
    keyFunction();
    return;
  }

  const uppercase = isShiftPressed();
  const string = keyboardToString(keyboardValue, uppercase);
  if (string !== undefined) {
    insertNewCharacter(string);
  }
}

function isShiftPressed() {
  return (
    keysPressed.has(Keyboard.LEFT_SHIFT) ||
    keysPressed.has(Keyboard.RIGHT_SHIFT)
  );
}

function insertNewCharacter(character: string) {
  const front = inputText.slice(0, inputTextIndex);
  const back = inputText.slice(inputTextIndex);
  inputText = `${front}${character}${back}`;
  inputTextIndex++;
}

function open() {
  consoleOpen = true;
  mod.disableAllInputs(MOD_NAME);
  AwaitingTextInput = true; // eslint-disable-line no-implicit-globals
}

function close(execute = true) {
  consoleOpen = false;
  mod.enableAllInputs(MOD_NAME);
  AwaitingTextInput = false; // eslint-disable-line no-implicit-globals

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
      addLocalChat("You must be in a game to chat with other players.");
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

  const resultTuple = getMapPartialMatch(command, chatCommandFunctionMap);
  if (resultTuple === undefined) {
    addLocalChat(`Unknown command: ${command}`);
    return;
  }

  const [commandName, commandFunction] = resultTuple;

  const onlineCommand = !OFFLINE_COMMANDS.has(commandName);
  if (onlineCommand && !socketClient.isConnected()) {
    addLocalChat(
      `You can only perform this command when connected to the ${MOD_NAME} server.`,
    );
    return;
  }

  const args = [...segments];
  commandFunction(args);
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
  // We check to see if the console is open again in case it was opened on this frame.
  if (!consoleOpen) {
    return;
  }

  const front = inputText.slice(0, inputTextIndex);
  const back = inputText.slice(inputTextIndex);
  const text = `>${front}${HexColors.YELLOW}|${HexColors.WHITE}${back}`;
  const position =
    g.game?.meeting === null ? CONSOLE_POSITION : CONSOLE_POSITION_LEFT;
  drawText(text, position);
}

const keyFunctionMap = new Map<Keyboard, () => void>();

// 256
keyFunctionMap.set(Keyboard.ESCAPE, () => {
  close(false);
});

// 257
keyFunctionMap.set(Keyboard.ENTER, () => {
  if (consoleOpen) {
    close();
  } else {
    open();
  }
});

// 258
keyFunctionMap.set(Keyboard.TAB, () => {
  if (!inputText.startsWith(COMMAND_PREFIX)) {
    return;
  }

  const partialCommand = inputText.slice(COMMAND_PREFIX.length);
  const commands = chatCommandFunctionMap.keys();
  for (const command of commands) {
    if (command.startsWith(partialCommand)) {
      inputText = COMMAND_PREFIX + command;
      inputTextIndex = inputText.length;
      return;
    }
  }
});

// 259
keyFunctionMap.set(Keyboard.BACKSPACE, () => {
  if (inputTextIndex === 0) {
    return;
  }

  const front = inputText.slice(0, inputTextIndex);
  const back = inputText.slice(inputTextIndex);
  const frontWithLastCharRemoved = front.slice(0, -1);
  inputText = frontWithLastCharRemoved + back;
  inputTextIndex--;
});

// 262
keyFunctionMap.set(Keyboard.RIGHT, () => {
  if (inputTextIndex === inputText.length) {
    return;
  }

  inputTextIndex++;
});

// 263
keyFunctionMap.set(Keyboard.LEFT, () => {
  if (inputTextIndex === 0) {
    return;
  }

  inputTextIndex--;
});

// 264
keyFunctionMap.set(Keyboard.DOWN, () => {
  if (historyIndex === -1) {
    return;
  }

  historyIndex--;

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
keyFunctionMap.set(Keyboard.UP, () => {
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
keyFunctionMap.set(Keyboard.HOME, () => {
  inputTextIndex = 0;
});

// 269
keyFunctionMap.set(Keyboard.END, () => {
  inputTextIndex = inputText.length;
});

// 47
keyFunctionMap.set(Keyboard.SLASH, () => {
  if (consoleOpen) {
    insertNewCharacter("/");
  } else {
    open();
    inputText = "/";
    inputTextIndex = 1;
  }
});

export function isConsoleOpen(): boolean {
  return consoleOpen;
}
