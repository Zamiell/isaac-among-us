export const MOD_NAME = "Among Us";

/** The version is updated automatically by a pre-publish script. */
export const VERSION = "0.0.1";

const USE_LOCAL_NETWORK = false;
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
export const REMOTE_HOSTNAME = USE_LOCAL_NETWORK
  ? "192.168.1.10"
  : "isaacracing.net";
