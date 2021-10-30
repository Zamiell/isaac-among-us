import * as console from "./features/console";
import * as disableMultiplayer from "./features/disableMultiplayer";
import * as errors from "./features/errors";
import * as socketClient from "./network/socketClient";

export function initFeatures(): void {
  errors.init();
  disableMultiplayer.init();
  socketClient.init();
  console.init();
}
