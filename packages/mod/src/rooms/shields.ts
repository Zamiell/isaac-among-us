import { runNextGameFrame } from "isaacscript-common";
import { addCollision } from "../collisionObjects";
import { EntityTypeCustom } from "../enums";
import { spawnFakeBlockLine } from "../spawnObjects";
import { spawnEntity } from "../utils";

export function spawnShieldsObjects(): void {
  // Bottom
  spawnFakeBlockLine(196, 13, Direction.RIGHT);
  spawnFakeBlockLine(211, 13, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(196, 223);
  });

  // Middle-left
  spawnFakeBlockLine(151, 5, Direction.RIGHT);
  spawnFakeBlockLine(136, 5, Direction.RIGHT);
  spawnFakeBlockLine(121, 3, Direction.RIGHT);
  spawnFakeBlockLine(106, 2, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(121, 153);
    addCollision(139, 154);
    addCollision(155, 155, -20);
  });

  // Right side of room, starting at the bottom
  spawnFakeBlockLine(187, 7, Direction.RIGHT);
  spawnFakeBlockLine(173, 6, Direction.RIGHT);
  spawnFakeBlockLine(159, 5, Direction.RIGHT);
  spawnFakeBlockLine(144, 5, Direction.RIGHT);
  spawnFakeBlockLine(129, 5, Direction.RIGHT);
  spawnFakeBlockLine(115, 4, Direction.RIGHT);
  spawnFakeBlockLine(100, 4, Direction.RIGHT);
  spawnFakeBlockLine(100, 4, Direction.RIGHT);
  spawnFakeBlockLine(84, 4, Direction.RIGHT);
  spawnFakeBlockLine(69, 4, Direction.RIGHT);
  spawnFakeBlockLine(54, 4, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(188, 193);
    addCollision(174, 178);
    addCollision(129, 163);
    addCollision(100, 148);
    addCollision(54, 87);
  });

  // Top left of room
  spawnFakeBlockLine(61, 4, Direction.RIGHT);
  spawnFakeBlockLine(46, 5, Direction.RIGHT);
  spawnFakeBlockLine(31, 5, Direction.RIGHT);
  spawnFakeBlockLine(16, 13, Direction.RIGHT);
  runNextGameFrame(() => {
    addCollision(16, 63);
    addCollision(19, 49);
    addCollision(20, 28);
  });

  const gridIndex = 111;
  spawnEntity(EntityTypeCustom.SHIELDS, 0, 0, gridIndex, -500);
}
