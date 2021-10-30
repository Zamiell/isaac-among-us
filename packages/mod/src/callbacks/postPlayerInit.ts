import * as disableMultiplayer from "../features/disableMultiplayer";

export function main(player: EntityPlayer): void {
  disableMultiplayer.postPlayerInit(player);
}
