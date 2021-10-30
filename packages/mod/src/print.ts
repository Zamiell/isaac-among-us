export function fixPrintFunction(): void {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  print = customPrint;
}

function customPrint(this: void, ...args: unknown[]) {
  const msg = getPrintMsg(args);

  // First, write it to the log.txt
  Isaac.DebugString(msg);

  // Second, write it to the console
  // (this needs to be terminated by a newline or else it won't display properly)
  const msgWithNewline = `${msg}\n`;
  Isaac.ConsoleOutput(msgWithNewline);
}

function getPrintMsg(args: unknown[]) {
  // Base case
  if (args === undefined) {
    return tostring(undefined);
  }

  let msg = "";
  for (const arg of args) {
    // Separate multiple arguments with a space
    // (a tab character appears as a circle, which is unsightly)
    if (msg !== "") {
      msg += " ";
    }

    let valueToPrint;
    const metatable = getmetatable(arg);
    const isVector =
      metatable !== undefined &&
      (metatable as Record<string, string>).__type === "Vector"; // eslint-disable-line
    if (isVector) {
      // Provide special formatting for Vectors
      const vector = arg as Vector;
      valueToPrint = `Vector(${vector.X}, ${vector.Y})`;
    } else {
      // By default, simply coerce the argument to a string, whatever it is
      valueToPrint = tostring(arg);
    }

    msg += valueToPrint;
  }

  return msg;
}
