import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { Presence, StatusContent } from "../../../../types";

/**
 * getStatus types
 */
export type GetStatusPathParams = {
  userId: string;
};

export type GetStatusOK = StatusContent;
export type GetStatusEndpoint = MatrixEndpoint<{
  pathParams: GetStatusPathParams;
}>;

/**
 * putStatus
 */
export type PutStatusPathParams = {
  userId: string;
};

export type PutStatusBody = {
  presence: Presence;
  status?: string;
};

export type PutStatusOK = Record<string, never>;
export type PutStatusEndpoint = MatrixEndpoint<{
  pathParams: PutStatusPathParams;
  body: PutStatusBody;
}>;
