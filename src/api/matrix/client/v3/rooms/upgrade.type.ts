import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postUpgrade types
 */
export type PostUpgradePathParams = {
  roomId: string;
};
export type PostUpgradeBody = {
  new_version: string;
  additional_creators?: string[];
};
export type PostUpgradeOK = {
  replacement_room: string;
};
export type PostUpgradeEndpoint = MatrixEndpoint<{
  pathParams: PostUpgradePathParams;
  body: PostUpgradeBody;
}>;
