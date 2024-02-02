import { MatrixRequestStruct } from "../../../MatrixRequestStruct";
import { PutRedactBody, PutRedactPathParams } from "./redact.type";

export const putRedact = (
  pathParams: PutRedactPathParams,
  body?: PutRedactBody,
): MatrixRequestStruct => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/redact/${encodeURIComponent(pathParams.eventId)}/${encodeURIComponent(pathParams.txnId)}`;

  return {
    method: "PUT",
    path,
    requireAuthentication: true,
    body: body ? JSON.stringify(body) : undefined,
  };
};
