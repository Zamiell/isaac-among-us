/* eslint-disable max-classes-per-file */
import { MeetingType } from "../enums/MeetingType";
import { SkeldRoom } from "../enums/SkeldRoom";
export var SocketCommandModToServer;
(function (SocketCommandModToServer) {
    SocketCommandModToServer["PING"] = "ping";
    SocketCommandModToServer["CHECK_USERNAME"] = "checkUsername";
    SocketCommandModToServer["LOGIN"] = "login";
    SocketCommandModToServer["GAME_LIST"] = "gameList";
    SocketCommandModToServer["CREATE"] = "create";
    SocketCommandModToServer["JOIN"] = "join";
    SocketCommandModToServer["LEAVE"] = "leave";
    SocketCommandModToServer["CHAT"] = "chat";
    SocketCommandModToServer["START"] = "start";
    SocketCommandModToServer["RECONNECT"] = "reconnect";
    SocketCommandModToServer["ROOM"] = "room";
    SocketCommandModToServer["KILL"] = "kill";
    SocketCommandModToServer["MEETING"] = "meeting";
    SocketCommandModToServer["VOTE"] = "vote";
    SocketCommandModToServer["TASK_COMPLETE"] = "taskComplete";
    SocketCommandModToServer["TERMINATE"] = "terminate";
    SocketCommandModToServer["REVIVE"] = "revive";
    SocketCommandModToServer["KILL_ME"] = "killMe";
    SocketCommandModToServer["DEBUG"] = "debug";
})(SocketCommandModToServer || (SocketCommandModToServer = {}));
export class CheckUsernameDataToServer {
    username = "";
}
export class LoginDataToServer {
    username = "";
    password = "";
}
export class CreateDataToServer {
    name = "";
}
export class JoinDataToServer {
    name = "";
    created = false;
}
export class LeaveDataToServer {
    gameID = 0;
}
export class ChatDataToServer {
    gameID = 0;
    msg = "";
}
export class StartDataToServer {
    gameID = 0;
}
export class ReconnectDataToServer {
    gameID = 0;
}
export class RoomDataToServer {
    gameID = 0;
    room = SkeldRoom.CAFETERIA;
    enterGridIndex = 0;
}
export class KillDataToServer {
    gameID = 0;
    userIDKilled = 0;
    room = SkeldRoom.CAFETERIA;
    x = 0;
    y = 0;
}
export class MeetingDataToServer {
    gameID = 0;
    meetingType = MeetingType.NONE;
    userIDKilled = 0;
}
export class VoteDataToServer {
    gameID = 0;
    userIDVotedFor = 0;
    skip = false;
}
export class TaskCompleteDataToServer {
    gameID = 0;
    task = 0;
}
export class TerminateDataToServer {
    gameID = 0;
}
export class ReviveDataToServer {
    gameID = 0;
}
export class KillMeDataToServer {
    gameID = 0;
    userIDKilled = 0;
    room = SkeldRoom.CAFETERIA;
    x = 0;
    y = 0;
}
export class DebugDataToServer {
    gameID = 0;
}
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class NoData {
}
export const SocketCommandModToServerData = {
    [SocketCommandModToServer.PING]: NoData,
    [SocketCommandModToServer.CHECK_USERNAME]: CheckUsernameDataToServer,
    [SocketCommandModToServer.LOGIN]: LoginDataToServer,
    [SocketCommandModToServer.GAME_LIST]: NoData,
    [SocketCommandModToServer.CREATE]: CreateDataToServer,
    [SocketCommandModToServer.JOIN]: JoinDataToServer,
    [SocketCommandModToServer.LEAVE]: LeaveDataToServer,
    [SocketCommandModToServer.CHAT]: ChatDataToServer,
    [SocketCommandModToServer.START]: StartDataToServer,
    [SocketCommandModToServer.RECONNECT]: ReconnectDataToServer,
    [SocketCommandModToServer.ROOM]: RoomDataToServer,
    [SocketCommandModToServer.KILL]: KillDataToServer,
    [SocketCommandModToServer.MEETING]: MeetingDataToServer,
    [SocketCommandModToServer.VOTE]: VoteDataToServer,
    [SocketCommandModToServer.TASK_COMPLETE]: TaskCompleteDataToServer,
    [SocketCommandModToServer.TERMINATE]: TerminateDataToServer,
    [SocketCommandModToServer.REVIVE]: ReviveDataToServer,
    [SocketCommandModToServer.KILL_ME]: KillMeDataToServer,
    [SocketCommandModToServer.DEBUG]: DebugDataToServer,
};
