local exports = {}

local collisionObjects
local gridIndexToCollisionObjects
local numCollisionObjectIds
local collisionObjectsPresent

--[[ places a collision object in the room
- Vec1: Top-left of rectangle
- Vec2: Bottom-right of rectangle
- collisionClass: CollisionClass enum (optional)
- conditions: Function(collObj, ent). Gets called on collision. Return true to allow collision (optional)
Returns the collision object which you can dynamically adjust
]]
function exports:setCollisionRect(Vec1, Vec2, collisionClass, conditions)
	numCollisionObjectIds = numCollisionObjectIds + 1
	collisionObjectsPresent = true
	local collisionObjId = numCollisionObjectIds
	local collisionObject = {
		Vec1 = {X=Vec1.X, Y=Vec1.Y}, -- saveable vector
		Vec2 = {X=Vec2.X, Y=Vec2.Y},
		Id = collisionObjId,
		CollisionClass = collisionClass or GridCollisionClass.COLLISION_SOLID,
		Conditions = conditions,
		Remove = function()
			collisionObjects[collisionObjId] = nil
		end
	}

	collisionObjects[collisionObjId] = collisionObject
	return collisionObject
end

-- collisionObjects is mapped by collisionObjId
local function getCollisionObjects()
	return collisionObjects
end

-- boolean
local function areCollisionObjectsPresent()
	return collisionObjectsPresent
end

--[[ checks if a EntityGridCollisionClass should collide with a GridCollisionClass
- eColClass: EntityGridCollisionClass enum
- gColClass: GridCollisionClass enum
- isPlayer: boolean. Special case for COLLISION_WALL_EXCEPT_PLAYER
]]
local function canCollideWithGrid(eColClass, gColClass, isPlayer)
	if gColClass == GridCollisionClass.COLLISION_PIT then
		return eColClass == EntityGridCollisionClass.GRIDCOLL_GROUND

	elseif gColClass == GridCollisionClass.COLLISION_SOLID or gColClass == GridCollisionClass.COLLISION_OBJECT then
		return eColClass == EntityGridCollisionClass.GRIDCOLL_GROUND or eColClass == EntityGridCollisionClass.GRIDCOLL_NOPITS or eColClass == EntityGridCollisionClass.GRIDCOLL_BULLET

	elseif gColClass == GridCollisionClass.COLLISION_WALL then
		return eColClass ~= EntityGridCollisionClass.GRIDCOLL_NONE

	elseif gColClass == GridCollisionClass.COLLISION_WALL_EXCEPT_PLAYER then
		return eColClass ~= EntityGridCollisionClass.GRIDCOLL_NONE and not isPlayer
	end

	return false
end

-- count of all active collisionObjects in the room
local function getNumCollisionObjects()
	local n = 0
	local collisionObjects = getCollisionObjects()
	for i=1, getNumCollisionObjectIds() do
		if collisionObjects[i] then
			n = n + 1
		end
	end

	return n
end

-- not necessarily the amount of collisionObjects in the room, as it also counts removed collision objects
local function getNumCollisionObjectIds()
	return numCollisionObjectIds
end

-- one-time operation that merges collision objects that could function as one together to improve performance
-- collision objects with collObj.DontMerge = true ignore this
local function mergeCollisionObjects()
	local collisionObjects = getCollisionObjects()
	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]

		if collObj and not collObj.DontMerge then
			for i2=1, getNumCollisionObjectIds() do
				local collObj2 = collisionObjects[i2]
				if collObj2 and not collObj2.DontMerge and collObj.CollisionClass == collObj2.CollisionClass and collObj.Conditions == collObj2.Conditions then
					if collObj.Vec2.X == collObj2.Vec1.X and collObj.Vec1.Y == collObj2.Vec1.Y and (collObj.Vec2.Y-collObj.Vec1.Y) == (collObj2.Vec2.Y-collObj2.Vec1.Y)
					or collObj.Vec1.X == collObj2.Vec1.X and collObj.Vec2.Y == collObj2.Vec1.Y and (collObj.Vec2.X-collObj.Vec1.X) == (collObj2.Vec2.X-collObj2.Vec1.X) then

						collObj.Vec2 = collObj2.Vec2
						collObj2:Remove()
					end
				end
			end
		end
	end
end

-- a method to reconnect conditions to collisionObjects after reloading.
-- works by setting a unique field for the collObjs (eg. collObj.IsCustomPoopGrid = true),
-- which is something that can be saved and reloaded to connect the right conditions function which normally can't be saved
local function reconnectCollisionObjectConditions(conditions, hasField)
	local collisionObjects = getCollisionObjects()
	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]
		if collObj and (not hasField or collObj[hasField]) then
			collObj.Conditions = conditions
		end
	end
end

-- assigns grid indices to all current collisionObjects to identify them by using getCollisionObjectsByGrid
local function assignGridIndicesToCollisionObjects()
	local room = Game():GetRoom()
	local collisionObjects = getCollisionObjects()
	gridIndexToCollisionObjects = {}

	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]

		if collObj then
			local gridIndices = {}
			local size = {X=collObj.Vec2.X - collObj.Vec1.X, Y=collObj.Vec2.Y - collObj.Vec1.Y}
			for x=0, math.ceil(size.X/40) do
				for y=0, math.ceil(size.Y/40) do
					local index = room:GetGridIndex(Vector(collObj.Vec1.X + math.min(x*40, size.X), collObj.Vec1.Y + math.min(y*40, size.Y)))

					local hasIndex = false
					for _,index2 in ipairs(gridIndices) do
						if index == index2 then
							hasIndex = true
							break
						end
					end

					if not hasIndex then
						table.insert(gridIndices, index)
					end
				end
			end

			for _,index in ipairs(gridIndices) do
				gridIndexToCollisionObjects[tostring(index)] = gridIndexToCollisionObjects[tostring(index)] or {}
				table.insert(gridIndexToCollisionObjects[tostring(index)], collObj)
			end
		end
	end
end

-- only works if assignGridIndicesToCollisionObjects() is used. Not easily compatible with moving collObjs
local function getCollisionObjectsByGrid(index)
	return gridIndexToCollisionObjects[tostring(index)] or {}
end

-- whether the entity is currently colliding with a collObj
local function collidesWithCollisionObject(ent)
	return areCollisionObjectsPresent() and not not ent:GetData().CollidesWithCollisionObject
end

-- whether the entity either currently collides with a vanilla grid or a collObj
local function collidesWithGrid(ent)
	return collidesWithCollisionObject(ent) or ent:CollidesWithGrid()
end

-- checks whether the entity will collide with collObjs if it's at a certain position
local function positionCollidesWithCollisionObject(pos, ent)
	if not areCollisionObjectsPresent() then
		return false
	end

	local collisionObjects = getCollisionObjects()
	local viableCollObjects = collisionObjects
	if ent then
		viableCollObjects = {}

		for i=1, getNumCollisionObjectIds() do
			local collObj = collisionObjects[i]
			if collObj and canCollideWithGrid(ent.GridCollisionClass, collObj.CollisionClass, ent.Type == EntityType.ENTITY_PLAYER)
			and (not collObj.Conditions or collObj.Conditions(collObj, ent)) then
				table.insert(viableCollObjects, collObj)
			end
		end
	end

	for _, collObj in pairs(viableCollObjects) do
		if pos.X >= math.min(collObj.Vec1.X, collObj.Vec2.X) and pos.X <= math.max(collObj.Vec1.X, collObj.Vec2.X)
		and pos.Y >= math.min(collObj.Vec1.Y, collObj.Vec2.Y) and pos.Y <= math.max(collObj.Vec1.Y, collObj.Vec2.Y) then
			return true
		end
	end

	return false
end

-- return value 1: distance. -1 if no collision object is found
-- return value 2: nearest collObj. nil if no collision object is found
local function distanceFromNearestCollisionObject(pos)
	if not areCollisionObjectsPresent() then
		return -1, nil
	end

	local collisionObjects = getCollisionObjects()
	local distance, nearestCollObj
	for i=1, getNumCollisionObjectIds() do
		local collObj = collisionObjects[i]
		if collObj then
			local closestPoint = Vector(math.min(math.max(pos.X, collObj.Vec1.X), collObj.Vec2.X), math.min(math.max(pos.Y, collObj.Vec1.Y), collObj.Vec2.Y))
			local dist = closestPoint:Distance(pos)
			if not nearestCollObj or dist < distance then
				distance = dist
				nearestCollObj = collObj
			end
		end
	end

	if not nearestCollObj then
		return -1, nil
	else
		return distanceSquared, nearestCollObj
	end
end

local function entityGridCollisionUpdate(_, ent)
	if areCollisionObjectsPresent() then
		local data = ent:GetData()
		data.CollidesWithCollisionObject = false
		local collisionObjects = getCollisionObjects()
		local viableCollObjects = {}
		for i=1, getNumCollisionObjectIds() do
			local collObj = collisionObjects[i]
			if collObj and canCollideWithGrid(ent.GridCollisionClass, collObj.CollisionClass, ent.Type == EntityType.ENTITY_PLAYER)
			and (not collObj.Conditions or collObj.Conditions(collObj, ent)) then
				table.insert(viableCollObjects, collObj)
			end
		end

		local entIdentifier = ent.Type == EntityType.ENTITY_TEAR and "TEAR"
							or ent.Type == EntityType.ENTITY_PROJECTILE and "PROJECTILE"
							or ent.Type == EntityType.ENTITY_PLAYER and "PLAYER"
							or ent.Type == EntityType.ENTITY_PICKUP and "PICKUP"
							or ent.Type == EntityType.ENTITY_BOMBDROP and "BOMB"
							or "NPC"

		local newTargetPos = ent.Position + ent.Velocity
		local maxX, maxY, minX, minY = math.huge, math.huge, 0, 0
		for _,collObj in ipairs(viableCollObjects) do
			if ent.Type == EntityType.ENTITY_TEAR or ent.Type == EntityType.ENTITY_PROJECTILE then
				local closestPoint = ent.Position:Clamped(collObj.Vec1.X, collObj.Vec1.Y, collObj.Vec2.X, collObj.Vec2.Y)

				if ent.Position:Distance(closestPoint) < ent.Size then
					local ignoreCollision = false
					-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
					-- PRE_TEAR_COLLISION_COLLOBJ, PRE_PROJECTILE_COLLISION_COLLOBJ
					--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
					for _, callback in ipairs(callbacks) do
						if (not callback.Params[1] or callback.Params[1] == ent.Variant) then
							local ret = callback.Function(ent, data, collObj)
							if ret ~= nil then ignoreCollision = not ret end
						end
					end]]

					if not ignoreCollision then
						ent:Die()
						return
					end
				end
			else
				local centerPoint = Vector(collObj.Vec1.X + collObj.Vec2.X, collObj.Vec1.Y + collObj.Vec2.Y) * 0.5
				local posDiff = ent.Position - centerPoint

				local scaledPosDiff
				if collObj.Vec2.X - collObj.Vec1.X ~= collObj.Vec2.Y - collObj.Vec1.Y then
					local coef = math.sqrt((collObj.Vec2.X - collObj.Vec1.X) / (collObj.Vec2.Y - collObj.Vec1.Y))
					scaledPosDiff = Vector(posDiff.X / coef, posDiff.Y * coef)
				else
					scaledPosDiff = posDiff
				end

				local ignoreCollision = false
				local closestPoint = ent.Position:Clamped(collObj.Vec1.X, collObj.Vec1.Y, collObj.Vec2.X, collObj.Vec2.Y)

				if ent.Position.X == closestPoint.X and ent.Position.Y == closestPoint.Y then
					-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
					-- PRE_PLAYER_COLLISION_COLLOBJ, PRE_PICKUP_COLLISION_COLLOBJ, PRE_BOMB_COLLISION_COLLOBJ
					--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
					local ignoreCollision = false
					for _, callback in ipairs(callbacks) do
						if entIdentifier == "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Type) and (not callback.Params[2] or callback.Params[2] == ent.Variant)
						or entIdentifier ~= "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Variant) then
							local ret = callback.Function(ent, data, collObj)
							if ret ~= nil then ignoreCollision = not ret end
						end
					end]]

					if not ignoreCollision then
						if math.abs(scaledPosDiff.X) > math.abs(scaledPosDiff.Y)  then
							if scaledPosDiff.X > 0 then
								minX = math.min(math.max(minX, collObj.Vec2.X + ent.Size), maxX)
								ent.Position = Vector(minX, ent.Position.Y)
							else
								maxX = math.min(math.max(minX, collObj.Vec1.X - ent.Size), maxX)
								ent.Position = Vector(maxX, ent.Position.Y)
							end
						else
							if scaledPosDiff.Y > 0 then
								minY = math.min(math.max(minY, collObj.Vec2.Y + ent.Size), maxY)
								ent.Position = Vector(ent.Position.X, minY)
							else
								maxY = math.min(math.max(minY, collObj.Vec1.Y - ent.Size), maxY)
								ent.Position = Vector(ent.Position.X, maxY)
							end
						end
						newTargetPos = ent.Position + ent.Velocity
						data.CollidesWithCollisionObject = true
					end

				elseif (ent.Position - closestPoint):LengthSquared() < ent.Size ^ 2 then
					local ignoreCollision = false
					-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
					--PRE_PLAYER_COLLISION_COLLOBJ, PRE_PICKUP_COLLISION_COLLOBJ, PRE_BOMB_COLLISION_COLLOBJ
					--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
					for _, callback in ipairs(callbacks) do
						if entIdentifier == "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Type) and (not callback.Params[2] or callback.Params[2] == ent.Variant)
						or entIdentifier ~= "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Variant) then
							local ret = callback.Function(ent, data, collObj)
							if ret ~= nil then ignoreCollision = not ret end
						end
					end]]

					if not ignoreCollision then
						if math.abs(scaledPosDiff.X) > math.abs(scaledPosDiff.Y)  then
							if scaledPosDiff.X > 0 then
								minX = math.min(math.max(minX, math.min(collObj.Vec2.X + ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).X)), maxX)
								ent.Position = Vector(minX, ent.Position.Y)
							else
								maxX = math.min(math.max(minX, math.max(collObj.Vec1.X - ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).X)), maxX)
								ent.Position = Vector(maxX, ent.Position.Y)
							end
						else
							if scaledPosDiff.Y > 0 then
								minY = math.min(math.max(minY, math.min(collObj.Vec2.Y + ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).Y)), maxY)
								ent.Position = Vector(ent.Position.X, minY)
							else
								maxY = math.min(math.max(minY, math.max(collObj.Vec1.Y - ent.Size, (closestPoint + (ent.Position-closestPoint):Resized(ent.Size)).Y)), maxY)
								ent.Position = Vector(ent.Position.X, maxY)
							end
						end
						newTargetPos = ent.Position + ent.Velocity
						data.CollidesWithCollisionObject = true
					end
				end

				if not ignoreCollision then
					local closestPointToTargetPos = Vector(math.min(math.max(newTargetPos.X, collObj.Vec1.X), collObj.Vec2.X), math.min(math.max(newTargetPos.Y, collObj.Vec1.Y), collObj.Vec2.Y))

					if (newTargetPos - closestPointToTargetPos):LengthSquared() < ent.Size ^ 2 then
						local ignoreCollision = false
						-- potential PRE_COLLISION_OBJECT callback setup, which stops collision with return false
						-- PRE_PLAYER_COLLISION_COLLOBJ, PRE_PICKUP_COLLISION_COLLOBJ, PRE_BOMB_COLLISION_COLLOBJ
						--[[local callbacks = StageAPI.GetCallbacks("PRE_" .. tostring(entIdentifier) .. "_COLLISION_COLLOBJ")
						for _, callback in ipairs(callbacks) do
							if entIdentifier == "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Type) and (not callback.Params[2] or callback.Params[2] == ent.Variant)
							or entIdentifier ~= "NPC" and (not callback.Params[1] or callback.Params[1] == ent.Variant) then
								local ret = callback.Function(ent, data, collObj)
								if ret ~= nil then ignoreCollision = not ret end
							end
						end]]

						if not ignoreCollision then
							if math.abs(scaledPosDiff.X) > math.abs(scaledPosDiff.Y)  then
								if scaledPosDiff.X > 0 then
									minX = math.min(math.max(minX, math.min(collObj.Vec2.X + ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).X)), maxX)
									newTargetPos = Vector(minX, newTargetPos.Y)
								else
									maxX = math.min(math.max(minX, math.max(collObj.Vec1.X - ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).X)), maxX)
									newTargetPos = Vector(maxX, newTargetPos.Y)
								end
							else
								if scaledPosDiff.Y > 0 then
									minY = math.min(math.max(minY, math.min(collObj.Vec2.Y + ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).Y)), maxY)
									newTargetPos = Vector(newTargetPos.X, minY)
								else
									maxY = math.min(math.max(minY, math.max(collObj.Vec1.Y - ent.Size, (closestPointToTargetPos + (newTargetPos-closestPointToTargetPos):Resized(ent.Size)).Y)), maxY)
									newTargetPos = Vector(newTargetPos.X, maxY)
								end
							end
							data.CollidesWithCollisionObject = true
						end
					end
				end
			end
		end

		ent.Velocity = newTargetPos - ent.Position
	end
end

function exports:init(mod)
	mod:AddCallback(ModCallbacks.MC_POST_NEW_ROOM, function()
		collisionObjects = {}
		gridIndexToCollisionObjects = {}
		numCollisionObjectIds = 0
		collisionObjectsPresent = false
	end)

	local entityUpdateCallbacks = {
		"MC_NPC_UPDATE",
		"MC_POST_PICKUP_UPDATE",
		"MC_POST_PLAYER_UPDATE",
		"MC_POST_BOMB_UPDATE",
		"MC_POST_TEAR_UPDATE",
		"MC_POST_PROJECTILE_UPDATE",
	}
	for _,callback in ipairs(entityUpdateCallbacks) do
		mod:AddCallback(ModCallbacks[callback], entityGridCollisionUpdate)
	end
end

return exports
