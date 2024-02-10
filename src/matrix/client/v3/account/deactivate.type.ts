export type IdServerUnbindResult = "success" | "no-support";

/**
 * postDeactivate types
 */
export type PostDeactivateBody = {
  auth?: object;
  id_server?: string;
};
export type PostDeactivateOK = {
  id_server_unbind_result: IdServerUnbindResult;
};
