import { ErrorDataToMod } from "common";
import { addLocalChat } from "../chat";

export function commandError(data: ErrorDataToMod): void {
  addLocalChat(`Error: ${data.msg}`);
}
