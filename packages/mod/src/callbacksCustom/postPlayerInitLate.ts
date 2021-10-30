import * as disableMultiplayer from "../features/disableMultiplayer";

export function main(player: EntityPlayer): void {
  disableMultiplayer.postPlayerInitLate(player);
}
