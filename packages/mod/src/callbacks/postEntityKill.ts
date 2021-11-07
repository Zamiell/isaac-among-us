import * as killWorms from "../tasks/killWorms";

export function main(_entity: Entity): void {
  killWorms.postEntityKill();
}
