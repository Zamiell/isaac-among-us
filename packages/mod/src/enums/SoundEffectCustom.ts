export const SoundEffectCustom = {
  DEAD_BODY_REPORT: Isaac.GetSoundIdByName("Dead Body Report"),
  EMERGENCY_MEETING: Isaac.GetSoundIdByName("Emergency Meeting"),
  KILL: Isaac.GetSoundIdByName("Kill"),
  PLAYER_JOINED: Isaac.GetSoundIdByName("Player Joined"),
  PLAYER_LEFT: Isaac.GetSoundIdByName("Player Left"),
  ROLE_REVEAL: Isaac.GetSoundIdByName("Role Reveal"),
  TASK_COMPLETE: Isaac.GetSoundIdByName("Task Complete"),
  VICTORY: Isaac.GetSoundIdByName("Victory"),
} as const;
