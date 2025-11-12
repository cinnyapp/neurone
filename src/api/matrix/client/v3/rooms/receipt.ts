import { PostReceiptEventIdEndpoint } from "./receipt.type";

/**
 * https://spec.matrix.org/v1.9/client-server-api/#post_matrixclientv3roomsroomidreceiptreceipttypeeventid
 */
export const postReceiptEventId: PostReceiptEventIdEndpoint = ({
  pathParams,
  body,
}) => {
  const path = `/_matrix/client/v3/rooms/${encodeURIComponent(pathParams.roomId)}/receipt/${encodeURIComponent(pathParams.receiptType)}/${encodeURIComponent(pathParams.eventId)}`;

  return {
    method: "POST",
    path,
    rateLimited: true,
    requireAuthentication: true,
    body: JSON.stringify(body ?? {}),
  };
};
