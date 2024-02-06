export type DeviceIdToEventContent = Record<string, object>;
export type UserIdToDeviceMessage = Record<string, DeviceIdToEventContent>;

export type SendToDeviceMessages = {
  messages: UserIdToDeviceMessage;
};

/**
 * putSendToDevice
 */
export type PutSendToDevicePathParams = {
  eventType: string;
  txnId: string;
};
export type PutSendToDeviceBody = SendToDeviceMessages;
