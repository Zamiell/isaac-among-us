import * as disableMultiplayer from "../features/disableMultiplayer";
import * as drawOtherPlayers from "../features/drawOtherPlayers";

export function main(player: EntityPlayer): void {
  disableMultiplayer.postPlayerInit(player);
  drawOtherPlayers.postPlayerInit(player);
}
