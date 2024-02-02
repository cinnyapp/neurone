import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import {
  AccountDataPathParams,
  PutAccountDataBody,
  PutAccountDataPathParams,
} from "./accountData.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#get_matrixclientv3useruseridaccount_datatype
 */
export const accountData = (
  pathParams: AccountDataPathParams,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/account_data/${encodeURIComponent(pathParams.type)}`;

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.9/client-server-api/#put_matrixclientv3useruseridaccount_datatype
 */
export const putAccountData = <Content extends object>(
  pathParams: PutAccountDataPathParams,
  body: PutAccountDataBody<Content>,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/user/${encodeURIComponent(pathParams.userId)}/account_data/${encodeURIComponent(pathParams.type)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: JSON.stringify(body),
  };
};
