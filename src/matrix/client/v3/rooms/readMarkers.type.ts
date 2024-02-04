import { ReceiptType } from "./receipt.type";

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
