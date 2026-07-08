import {
  OlmMachine,
  UserId,
  DeviceLists as CryptoDeviceLists,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { DeviceLists, ToDeviceEvent } from "../../api/types";
import {
  ProcessedToDeviceEvent,
  processedToDeviceEventFromRust,
} from "./events";

export type EncryptionSyncChanges = {
  /**
   * To-device events received from the `/sync` response.
   *
   * These may include:
   * - encrypted to-device messages
   * - key verification events
   * - room key forwarding
   * - secret storage events
   */
  toDeviceEvents?: ToDeviceEvent[];

  /**
   * Device list updates received from the `/sync` response.
   *
   * Used to track users whose device keys have changed
   * or whose devices are no longer shared.
   */
  deviceLists?: DeviceLists;

  /**
   * Current one-time-key counts reported by the homeserver.
   *
   * Keyed by algorithm name.
   *
   * Example:
   * {
   *   "signed_curve25519": 42
   * }
   */
  oneTimeKeysCounts?: Record<string, number>;

  /**
   * Unused fallback key algorithms currently stored
   * on the homeserver.
   */
  unusedFallbackKeys?: string[];
};

export class SyncChanges {
  private readonly olmMachine: OlmMachine;

  constructor(olmMachine: OlmMachine) {
    this.olmMachine = olmMachine;
  }

  /**
   * Processes encryption-related sync data received from `/sync`
   * and forwards it to the `OlmMachine`.
   *
   * This updates the crypto machine state with:
   * - to-device events
   * - device list changes
   * - one-time-key counts
   * - fallback key usage information
   *
   * The crypto machine may:
   * - decrypt encrypted to-device events
   * - update tracked device identities
   * - create new outgoing crypto requests
   * - rotate or upload keys
   *
   * @param changes - Encryption-related data extracted from a `/sync` response.
   *
   * @returns The processed/decrypted to-device events returned by the crypto machine.
   *
   * @throws Error
   * Propagates errors thrown by the underlying `OlmMachine`.
   */
  async receive(
    changes: EncryptionSyncChanges,
  ): Promise<ProcessedToDeviceEvent[]> {
    const deviceLists = new CryptoDeviceLists(
      changes.deviceLists?.changed?.map((userId) => new UserId(userId)),
      changes.deviceLists?.left?.map((userId) => new UserId(userId)),
    );

    const oneTimeKeysCounts = new Map<string, number>();
    if (changes.oneTimeKeysCounts) {
      Object.entries(changes.oneTimeKeysCounts).forEach(
        ([algorithm, otkCount]) => {
          oneTimeKeysCounts.set(algorithm, otkCount);
        },
      );
    }

    const unusedFallbackKeys = new Set(changes.unusedFallbackKeys);

    const processedToDeviceEvents = await this.olmMachine.receiveSyncChanges(
      JSON.stringify(changes.toDeviceEvents ?? []),
      deviceLists,
      oneTimeKeysCounts,
      unusedFallbackKeys,
    );

    return processedToDeviceEvents.map((event) =>
      processedToDeviceEventFromRust(event),
    );
  }
}
