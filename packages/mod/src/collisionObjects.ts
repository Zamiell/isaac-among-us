import { DISTANCE_OF_GRID_TILE } from "isaacscript-common";
import * as collisionObjects from "./lib/collisionObjects";

/**
 * The naive solution to add collision is to add a block grid entity or a wall grid entity. However,
 * doing this causes bugs with StageAPI where it will cause objects to shift.
 *
 * To work around this problem, we instead use Sentinel's collision library that creates ephemeral
 * custom collision that is automatically deleted once the room is left.
 *
 * Note that collision will fail to be added in the POST_ROOM_LOAD callback. In this case, defer
 * calling this function by a frame.
 */
export function addCollision(
  topLeftGridIndex: int,
  bottomRightGridIndex = topLeftGridIndex,
  bottomRightXModifier = 0,
  bottomRightYModifier = 0,
): void {
  const game = Game();
  const room = game.GetRoom();
  const halfTileDistance = DISTANCE_OF_GRID_TILE / 2;
  const halfTileVectorPlus = Vector(halfTileDistance, halfTileDistance);
  const halfTileVectorMinus = halfTileVectorPlus.mul(-1);

  const topLeftGridPosition = room.GetGridPosition(topLeftGridIndex);
  const topLeftOfGridIndex = topLeftGridPosition.add(halfTileVectorMinus);
  const bottomRightGridPosition = room.GetGridPosition(bottomRightGridIndex);
  const bottomRightOfGridIndex =
    bottomRightGridPosition.add(halfTileVectorPlus);
  const modifier = Vector(bottomRightXModifier, bottomRightYModifier);
  const bottomRightPos = bottomRightOfGridIndex.add(modifier);

  collisionObjects.setCollisionRect(topLeftOfGridIndex, bottomRightPos);
}
