import {
  SocketCommandServerToMod,
  SocketCommandServerToModData,
} from "./types/SocketCommands";

const DATA_SEPARATOR = " ";

export function packTCPMsg<T extends SocketCommandServerToMod>(
  command: T,
  data: InstanceType<typeof SocketCommandServerToModData[T]>,
): string {
  const dataString = JSON.stringify(data);
  return `${command}${DATA_SEPARATOR}${dataString}\n`;
}

export function unpackTCPMsg(msg: string): [string, unknown] {
  msg = msg.trim();
  const msgArray = msg.split(DATA_SEPARATOR);
  const [command, ...dataArray] = msgArray;
  const dataString = dataArray.join(DATA_SEPARATOR);

  // Server-specific implementation
  let data: unknown = {};
  if (dataString !== "") {
    data = JSON.parse(dataString) as unknown;
  }

  return [command!, data]; // eslint-disable-line @typescript-eslint/no-non-null-assertion
}
