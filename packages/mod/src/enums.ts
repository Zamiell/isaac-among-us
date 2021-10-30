export enum EntityTypeCustom {
  // Lobby
  BOX = Isaac.GetEntityTypeByName("Large Box"),
  TABLE = Isaac.GetEntityTypeByName("Table"),

  // Admin (2)
  ADMIN_TABLE = Isaac.GetEntityTypeByName("Admin Table"),
  ADMIN_TOP = Isaac.GetEntityTypeByName("Admin Top"),

  // Storage (3)
  STORAGE = Isaac.GetEntityTypeByName("Storage"),

  // Medbay (5)
  BED = Isaac.GetEntityTypeByName("Bed"),

  // Upper Engine (6)
  ENGINE = Isaac.GetEntityTypeByName("Engine"),

  // Reactor (8)
  REACTOR = Isaac.GetEntityTypeByName("Reactor"),

  // Security (9)
  SECURITY_TABLE = Isaac.GetEntityTypeByName("Security Table"),

  // Electrical (12)
  ELECTRICAL = Isaac.GetEntityTypeByName("Electrical"),

  // Weapons (13)
  WEAPONS = Isaac.GetEntityTypeByName("Weapons"),

  // O2 (15)
  TANK = Isaac.GetEntityTypeByName("Tank"),

  // Navigation (16)
  SHIP_CONTROLS = Isaac.GetEntityTypeByName("Ship Controls"),

  // Shields (18)
  SHIELDS = Isaac.GetEntityTypeByName("Shields"),

  // Communication (20)
  COMPUTER = Isaac.GetEntityTypeByName("Computer"),
  RADIO = Isaac.GetEntityTypeByName("Radio"),
}

export enum BoxVariant {
  LARGE = Isaac.GetEntityVariantByName("Large Box"),
  SMALL = Isaac.GetEntityVariantByName("Small Box"),
}

export enum EffectVariantCustom {
  STAGE_API_DOOR = Isaac.GetEntityVariantByName("StageAPIDoor"),
  VENT = Isaac.GetEntityVariantByName("Vent"),
  BUTTON = Isaac.GetEntityVariantByName("Button"),
}

export enum ButtonSubType {
  TASK,
  TASK_RETURN,
  EMERGENCY,
  SPECIAL,
}
