import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getAliases types
 */
export type GetAliasesPathParams = {
  roomId: string;
};
export type GetAliasesOK = {
  aliases: string[];
};
export type GetAliasesEndpoint = MatrixEndpoint<{
  pathParams: GetAliasesPathParams;
}>;
