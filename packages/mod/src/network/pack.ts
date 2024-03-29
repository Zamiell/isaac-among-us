import type {
  SocketCommandModToServer,
  SocketCommandModToServerData,
} from "common";
import { jsonDecode, jsonEncode, log } from "isaacscript-common";
import * as struct from "../lib/struct";
import type { UDPPositionInterface } from "./udpData";
import { UDP_POSITION_DATA_FORMAT, UDP_POSITION_FIELDS } from "./udpData";

const DATA_SEPARATOR = " ";
const DEBUG = false as boolean;

export function packTCPMsg<T extends SocketCommandModToServer>(
  command: T,
  data: InstanceType<(typeof SocketCommandModToServerData)[T]>,
): string {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (data === undefined) {
    return `${command}\n`;
  }

  const dataString = jsonEncode(data);
  return `${command}${DATA_SEPARATOR}${dataString}\n`;
}

export function unpackTCPMsg(msg: string): [string, unknown] {
  msg = msg.trim();
  const msgArray = msg.split(DATA_SEPARATOR);
  const [command, ...dataArray] = msgArray;
  const dataString = dataArray.join(DATA_SEPARATOR);

  // Client-specific implementation
  const data = jsonDecode(dataString) as unknown;

  return [command!, data]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
}

export function unpackUDPPlayerMessage(rawData: string): UDPPositionInterface {
  if (DEBUG) {
    log("Unpacking UDP message:");
  }

  const dataArray = [...struct.unpack(UDP_POSITION_DATA_FORMAT, rawData)];
  const playerMessage: Record<string, unknown> = {};
  for (const [i, udpPositionField] of UDP_POSITION_FIELDS.entries()) {
    const [name] = udpPositionField;
    let fieldData = dataArray[i];
    if (type(fieldData) === "string") {
      fieldData = (fieldData as string).trim();
    }
    playerMessage[name] = fieldData;

    if (DEBUG) {
      log(`- ${name} - ${fieldData}`);
    }
  }

  return playerMessage as unknown as UDPPositionInterface;
}
