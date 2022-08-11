import { ModCallback } from "isaac-typescript-definitions";
import * as blackSprite from "../features/blackSprite";
import * as chatCallbacks from "../features/chatCallbacks";
import * as connectedIcon from "../features/connectedIcon";
import * as console from "../features/console";
import * as drawMeeting from "../features/drawMeeting";
import * as drawOtherPlayers from "../features/drawOtherPlayers";
import * as drawOurUsername from "../features/drawOurUsername";
import * as drawRoomDescription from "../features/drawRoomDescription";
import * as endGameCutscene from "../features/endGameCutscene";
import * as endMeeting from "../features/endMeeting";
import * as errors from "../features/errors";
import * as kill from "../features/kill";
import * as report from "../features/report";
import * as restartOnNextFrame from "../features/restartOnNextFrame";
import * as startGameCutscene from "../features/startGameCutscene";
import * as startMeeting from "../features/startMeeting";
import * as welcomeNotification from "../features/welcomeNotification";
import * as socket from "../network/socket";
import * as udp from "../network/udp";
import * as fixWires from "../tasks/fixWires";
import * as identifyCollectibles from "../tasks/identifyCollectibles";
import * as identifyPickupsInOrder from "../tasks/identifyPickupsInOrder";
import * as identifyTrinkets from "../tasks/identifyTrinkets";
import * as makePentagram from "../tasks/makePentagram";
import * as pushButtonsInOrder from "../tasks/pushButtonsInOrder";

export function init(mod: Mod): void {
  mod.AddCallback(ModCallback.POST_RENDER, main);
}

function main() {
  if (errors.postRender()) {
    return;
  }

  restartOnNextFrame.postRender();
  socket.postRender();
  welcomeNotification.postRender();
  udp.postRender();
  drawOtherPlayers.postRender();
  drawOurUsername.postRender();

  console.postRender();
  connectedIcon.postRender();
  chatCallbacks.postRender();

  blackSprite.postRender(); // The black sprite has to be drawn before the text.
  startGameCutscene.postRender();
  endGameCutscene.postRender();
  startMeeting.postRender();
  drawMeeting.postRender();
  endMeeting.postRender();
  kill.postRender();
  report.postRender();

  // Tasks
  identifyCollectibles.postRender();
  identifyTrinkets.postRender();
  makePentagram.postRender();
  fixWires.postRender();
  identifyPickupsInOrder.postRender();
  pushButtonsInOrder.postRender();

  // We want the room description to have precedence over all other types of graphics.
  drawRoomDescription.postRender();
}
