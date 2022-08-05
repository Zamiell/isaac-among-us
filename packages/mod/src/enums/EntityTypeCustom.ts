export const EntityTypeCustom = {
  // Lobby
  BOX: Isaac.GetEntityTypeByName("Large Box"),

  // Cafeteria (0)
  TABLE: Isaac.GetEntityTypeByName("Table"),

  // Admin (2)
  ADMIN_TABLE: Isaac.GetEntityTypeByName("Admin Table"),
  ADMIN_TOP: Isaac.GetEntityTypeByName("Admin Top"),

  // Storage (3)
  STORAGE: Isaac.GetEntityTypeByName("Storage"),

  // Medbay (5)
  BED: Isaac.GetEntityTypeByName("Bed"),

  // Upper Engine (6)
  ENGINE: Isaac.GetEntityTypeByName("Engine"),

  // Reactor (8)
  REACTOR: Isaac.GetEntityTypeByName("Reactor"),

  // Security (9)
  SECURITY_TABLE: Isaac.GetEntityTypeByName("Security Table"),

  // Electrical (12)
  ELECTRICAL: Isaac.GetEntityTypeByName("Electrical"),
  WIRE_SIGN: Isaac.GetEntityTypeByName("Wire Sign"),
  LINE: Isaac.GetEntityTypeByName("Line"),

  // Weapons (13)
  WEAPONS: Isaac.GetEntityTypeByName("Weapons"),

  // O2 (15)
  TANK: Isaac.GetEntityTypeByName("Tank"),

  // Navigation (16)
  SHIP_CONTROLS: Isaac.GetEntityTypeByName("Ship Controls"),

  // Shields (18)
  SHIELDS: Isaac.GetEntityTypeByName("Shields"),

  // Communication (20)
  COMPUTER: Isaac.GetEntityTypeByName("Computer"),
  RADIO: Isaac.GetEntityTypeByName("Radio"),
} as const;
