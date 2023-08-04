import { log } from "isaacscript-common";
import { REMOTE_HOSTNAME } from "../constants";

let sandbox: Sandbox | null = null;

export function getClientFromSandbox(
  port: int,
  useTCP: boolean,
): SocketClient | undefined {
  if (sandbox === null) {
    return undefined;
  }

  return sandbox.connect(REMOTE_HOSTNAME, port, useTCP);
}

/** Helper function to call `os.date()`. */
export function getFormattedTime(): string {
  const format = "%X";

  if (sandbox !== null) {
    return sandbox.getDate(format);
  }

  return os.date(format);
}

/** Helper function to call `socket.gettime()`. */
export function getSocketTime(): float {
  if (sandbox === null) {
    error("The sandbox is not initialized.");
  }

  return sandbox.getTime();
}

export function isSandboxEnabled(): boolean {
  return sandbox !== null;
}

/**
 * Racing+ installs a sandbox that prevents mods from doing unsafe things. If the sandbox is in
 * place, then the require call in the "init()" function will fail even though the "--luadebug" flag
 * is enabled.
 *
 * This function is similar to the Racing+ "init()" function in "socketClient.ts".
 */
export function tryInitRacingPlusSandbox(): void {
  // eslint-disable-next-line unicorn/prefer-module
  const [ok, requiredSandbox] = pcall(require, "sandbox");
  if (!ok) {
    return;
  }

  sandbox = requiredSandbox as Sandbox;

  if (SandboxTraceback === undefined) {
    sandbox = null;
    log(
      'Detected the sandbox environment, but it was not initialized correctly. (The invocation in the "main.lua" file is probably missing.)',
    );
    return;
  }

  if (!sandbox.isSocketInitialized()) {
    sandbox = null;
    log(
      'Detected the sandbox environment, but the socket library failed to load. (The "--luadebug" flag is probably turned off.)',
    );
    return;
  }

  log("Detected the sandbox environment.");
}
