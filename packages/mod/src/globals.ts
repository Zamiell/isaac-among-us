import { Globals } from "./types/Globals";

const globals = new Globals();
export default globals;

declare let g: Globals;
g = globals; // eslint-disable-line
