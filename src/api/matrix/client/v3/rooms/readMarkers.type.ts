import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { ReceiptType } from "../../../../types";

/**
 * postReadMarkers types
 */
export type PostReadMarkersPathParams = {
  roomId: string;
};
export type PostReadMarkersBody = {
  [K in ReceiptType]?: string;
};
export type PostReadMarkersOK = Record<string, never>;
export type PostReadMarkersEndpoint = MatrixEndpoint<{
  pathParams: PostReadMarkersPathParams;
  body?: PostReadMarkersBody;
}>;
