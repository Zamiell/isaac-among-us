import * as blackSprite from "../features/blackSprite";
import * as chatCallbacks from "../features/chatCallbacks";
import * as connectedIcon from "../features/connectedIcon";
import * as console from "../features/console";
import * as cutscene from "../features/cutscene";
import * as drawMeeting from "../features/drawMeeting";
import * as drawOtherPlayers from "../features/drawOtherPlayers";
import * as drawOurUsername from "../features/drawOurUsername";
import * as drawRoomDescription from "../features/drawRoomDescription";
import * as endMeeting from "../features/endMeeting";
import * as errors from "../features/errors";
import * as restartOnNextFrame from "../features/restartOnNextFrame";
import * as startMeeting from "../features/startMeeting";
import * as welcomeNotification from "../features/welcomeNotification";
import * as socket from "../network/socket";
import * as udp from "../network/udp";
import * as fixWires from "../tasks/fixWires";
import * as identifyItems from "../tasks/identifyItems";
import * as identifyPickupsInOrder from "../tasks/identifyPickupsInOrder";
import * as identifyTrinkets from "../tasks/identifyTrinkets";
import * as makePentagram from "../tasks/makePentagram";
import * as pushButtonsInOrder from "../tasks/pushButtonsInOrder";

export function main(): void {
  if (errors.postRender()) {
    return;
  }

  restartOnNextFrame.postRender();
  socket.postRender();
  welcomeNotification.postRender();
  udp.postRender();
  drawRoomDescription.postRender();
  drawOtherPlayers.postRender();
  drawOurUsername.postRender();

  console.postRender();
  connectedIcon.postRender();
  chatCallbacks.postRender();

  blackSprite.postRender(); // The black sprite has to be drawn before the text
  cutscene.postRender();
  startMeeting.postRender();
  drawMeeting.postRender();
  endMeeting.postRender();

  // Tasks
  identifyItems.postRender();
  identifyTrinkets.postRender();
  makePentagram.postRender();
  fixWires.postRender();
  identifyPickupsInOrder.postRender();
  pushButtonsInOrder.postRender();
}
