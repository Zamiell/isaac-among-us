export var SocketCommandServerToMod;
(function (SocketCommandServerToMod) {
    SocketCommandServerToMod["ERROR"] = "error";
    SocketCommandServerToMod["USERNAME"] = "username";
    SocketCommandServerToMod["LOGGED_IN"] = "loggedIn";
    SocketCommandServerToMod["USER_CONNECTED"] = "userConnected";
    SocketCommandServerToMod["GAME_LIST"] = "gameList";
    SocketCommandServerToMod["NEW_GAME"] = "newGame";
    SocketCommandServerToMod["JOINED"] = "joined";
    SocketCommandServerToMod["LEFT"] = "left";
    SocketCommandServerToMod["GAME_DESCRIPTION"] = "gameDescription";
    SocketCommandServerToMod["CHAT"] = "chat";
    SocketCommandServerToMod["STARTED"] = "started";
    SocketCommandServerToMod["RECONNECT"] = "reconnect";
    SocketCommandServerToMod["EMERGENCY_BUTTON_COOLDOWN"] = "emergencyButtonCooldown";
    SocketCommandServerToMod["KILLED"] = "killed";
    SocketCommandServerToMod["START_MEETING"] = "startMeeting";
    SocketCommandServerToMod["START_VOTING"] = "startVoting";
    SocketCommandServerToMod["VOTE"] = "vote";
    SocketCommandServerToMod["END_MEETING"] = "endMeeting";
    SocketCommandServerToMod["END_GAME"] = "endGame";
    SocketCommandServerToMod["TERMINATED"] = "terminated";
})(SocketCommandServerToMod || (SocketCommandServerToMod = {}));
export class ErrorDataToMod {
    msg;
}
export class UsernameDataToMod {
    username;
    exists;
}
export class LoggedInDataToMod {
    userID;
    username;
}
export class UserConnectedDataToMod {
    userID;
    username;
    connected;
}
export class GameListDataToMod {
    gameList;
}
export class GameListDescription {
    id;
    name;
    numPlayers;
    started;
    joined;
}
export class NewGameDataToMod {
    id;
    name;
    creator;
}
export class JoinedDataToMod {
    gameID;
    name;
    created;
    character;
    reconnected;
}
export class LeftDataToMod {
    gameID;
}
export class GameDescriptionDataToMod {
    gameID;
    players;
    started;
    meeting;
}
export class GameDescriptionPlayer {
    index;
    userID;
    username;
    connected;
    character;
    alive;
    room;
    usedEmergencyMeeting;
}
export class ChatDataToMod {
    gameID;
    from;
    msg;
}
export class StartedDataToMod {
    gameID;
    imposters;
    tasks;
}
export class ReconnectDataToMod {
    gameID;
    name;
    players;
    imposters;
    meeting;
    tasks;
    character;
    room;
    enterGridIndex;
    bodies;
}
export class EmergencyButtonCooldownDataToMod {
    gameID;
    cooldown;
}
export class KilledDataToMod {
    gameID;
    userIDKilled;
    room;
    x;
    y;
}
export class StartMeetingDataToMod {
    gameID;
    meetingType;
    userIDInitiated;
    userIDKilled;
    playersKilledSinceLastMeeting;
    timePhaseStarted;
    phaseLengthSeconds;
    votes;
}
export class StartVotingDataToMod {
    gameID;
    timePhaseStarted;
    phaseLengthSeconds;
}
export class VoteDataToMod {
    gameID;
    votes;
}
export class TaskCompleteDataToMod {
    gameID;
    votes;
}
export class EndMeetingDataToMod {
    gameID;
    meetingResolution;
    userIDEjected;
}
export class EndGameDataToMod {
    gameID;
    winningRole;
    roles;
}
export class TerminatedDataToMod {
    gameID;
}
export const SocketCommandServerToModData = {
    [SocketCommandServerToMod.ERROR]: ErrorDataToMod,
    [SocketCommandServerToMod.USERNAME]: UsernameDataToMod,
    [SocketCommandServerToMod.LOGGED_IN]: LoggedInDataToMod,
    [SocketCommandServerToMod.USER_CONNECTED]: UserConnectedDataToMod,
    [SocketCommandServerToMod.GAME_LIST]: GameListDataToMod,
    [SocketCommandServerToMod.NEW_GAME]: NewGameDataToMod,
    [SocketCommandServerToMod.JOINED]: JoinedDataToMod,
    [SocketCommandServerToMod.LEFT]: LeftDataToMod,
    [SocketCommandServerToMod.GAME_DESCRIPTION]: GameDescriptionDataToMod,
    [SocketCommandServerToMod.CHAT]: ChatDataToMod,
    [SocketCommandServerToMod.STARTED]: StartedDataToMod,
    [SocketCommandServerToMod.RECONNECT]: ReconnectDataToMod,
    [SocketCommandServerToMod.EMERGENCY_BUTTON_COOLDOWN]: EmergencyButtonCooldownDataToMod,
    [SocketCommandServerToMod.KILLED]: KilledDataToMod,
    [SocketCommandServerToMod.START_MEETING]: StartMeetingDataToMod,
    [SocketCommandServerToMod.START_VOTING]: StartVotingDataToMod,
    [SocketCommandServerToMod.VOTE]: VoteDataToMod,
    [SocketCommandServerToMod.END_MEETING]: EndMeetingDataToMod,
    [SocketCommandServerToMod.END_GAME]: EndGameDataToMod,
    [SocketCommandServerToMod.TERMINATED]: TerminatedDataToMod,
};
