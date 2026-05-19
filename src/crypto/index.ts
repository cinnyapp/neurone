import {
  DeviceId,
  initAsync,
  OlmMachine,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";

export * as machine from "./machine";

export async function loadCrypto(
  userId: string,
  deviceId: string,
): Promise<OlmMachine> {
  await initAsync();

  const uId = new UserId(userId);
  const dId = new DeviceId(deviceId);

  const olmMachine = await OlmMachine.initialize(uId, dId, `neurone${userId}`);

  olmMachine.roomKeyRequestsEnabled = false;

  return olmMachine;
}
