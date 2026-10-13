/*
Cinny Project
Copyright 2024-present Ajay Bura
SPDX-License-Identifier: Apache-2.0
https://cinny.in

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {
  CollectStrategy,
  OlmMachine,
  RoomId,
  StoredRoomKeyBundleData,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import { OutgoingRequests } from "./OutgoingRequests";
import { EncryptionSettings } from "./types";
import { encryptionSettingsToRust } from "./utils";
import { RoomKeysImportResult } from "./backup";

export type RoomKeyCount = {
  total: number;
  backedUp: number;
};

export type RoomKeysBundle = {
  encryptedData: Uint8Array<ArrayBufferLike>;
  mediaEncryptionInfo?: string;
};

export type PendingKeyBundleDetails = {
  inviteAcceptedTs: number;
  inviter: string;
  roomId: string;
};

export class RoomKeys {
  private readonly olmMachine: OlmMachine;

  private readonly outgoingRequests: OutgoingRequests;

  static encryptExportedRoomKeys(
    roomKeys: string,
    passphrase: string,
    round: number,
  ): string {
    return OlmMachine.encryptExportedRoomKeys(roomKeys, passphrase, round);
  }

  static decryptExportedRoomKeys(
    encryptedRoomKeys: string,
    passphrase: string,
  ): string {
    return OlmMachine.decryptExportedRoomKeys(encryptedRoomKeys, passphrase);
  }

  constructor(olmMachine: OlmMachine, outgoingRequests: OutgoingRequests) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = outgoingRequests;
  }

  get roomKeyForwardingEnabled(): boolean {
    return this.roomKeyForwardingEnabled;
  }

  set roomKeyForwardingEnabled(enabled: boolean) {
    this.roomKeyForwardingEnabled = enabled;
  }

  get roomKeyRequestsEnabled(): boolean {
    return this.roomKeyRequestsEnabled;
  }

  set roomKeyRequestsEnabled(enabled: boolean) {
    this.roomKeyRequestsEnabled = enabled;
  }

  async count(): Promise<RoomKeyCount> {
    const keyCount = await this.olmMachine.roomKeyCounts();
    return {
      total: keyCount.total,
      backedUp: keyCount.backedUp,
    };
  }

  async hasDownloadedAllRoomKeys(roomId: string): Promise<boolean> {
    return this.olmMachine.hasDownloadedAllRoomKeys(new RoomId(roomId));
  }

  async setDownloadedAllRoomKeys(roomId: string): Promise<void> {
    await this.olmMachine.setHasDownloadedAllRoomKeys(new RoomId(roomId));
  }

  /**
   * Shares the room encryption key with the provided users.
   *
   * This generates one or more to-device requests required for
   * securely distributing the Megolm session key to devices that
   * do not yet have it.
   *
   * @param roomId Matrix room ID whose encryption keys should be shared.
   * @param users Matrix user IDs that should receive the room keys.
   */
  async shareRoomKey(
    roomId: string,
    users: string[],
    encryptionSettings: EncryptionSettings,
  ): Promise<void> {
    const requests = await this.olmMachine.shareRoomKey(
      new RoomId(roomId),
      users.map((userId) => new UserId(userId)),
      encryptionSettingsToRust(encryptionSettings),
    );
    if (!Array.isArray(requests)) return;

    this.outgoingRequests.sendMultiple(requests);
  }

  async bundleRoomKeys(roomId: string): Promise<undefined | RoomKeysBundle> {
    const bundle = await this.olmMachine.buildRoomKeyBundle(new RoomId(roomId));
    if (!bundle) return undefined;
    const { encryptedData, mediaEncryptionInfo } = bundle;
    return {
      encryptedData,
      mediaEncryptionInfo,
    };
  }

  async shareRoomKeysBundle(
    roomId: string,
    userId: string,
    contentUri: string,
    encryptionInfo: string | undefined,
  ) {
    const requests = await this.olmMachine.shareRoomKeyBundleData(
      new UserId(userId),
      new RoomId(roomId),
      contentUri,
      encryptionInfo,
      CollectStrategy.identityBasedStrategy(),
    );

    await this.outgoingRequests.sendMultiple(requests);
  }

  async getReceivedRoomKeysBundle(
    roomId: string,
    inviter: string,
  ): Promise<StoredRoomKeyBundleData | undefined> {
    const bundle = await this.olmMachine.getReceivedRoomKeyBundleData(
      new RoomId(roomId),
      new UserId(inviter),
    );
    if (!bundle) return undefined;

    return bundle;
  }

  async receiveRoomKeysBundle(
    bundle: StoredRoomKeyBundleData,
    encryptedData: Uint8Array<ArrayBufferLike>,
  ): Promise<void> {
    await this.olmMachine.receiveRoomKeyBundle(bundle, encryptedData);
  }

  async storeRoomPendingKeyBundle(
    roomId: string,
    inviter: string,
  ): Promise<void> {
    await this.olmMachine.storeRoomPendingKeyBundle(
      new RoomId(roomId),
      new UserId(inviter),
    );
  }

  async clearRoomPendingKeyBundle(roomId: string): Promise<void> {
    await this.olmMachine.clearRoomPendingKeyBundle(new RoomId(roomId));
  }

  async getPendingKeyBundleDetailsForRoom(
    roomId: string,
  ): Promise<PendingKeyBundleDetails | undefined> {
    const details = await this.olmMachine.getPendingKeyBundleDetailsForRoom(
      new RoomId(roomId),
    );

    if (!details) return undefined;

    return {
      inviteAcceptedTs: details.inviteAcceptedAtMillis,
      inviter: details.inviterId.toString(),
      roomId: details.roomId.toString(),
    };
  }

  async getAllRoomsPendingKeyBundles(): Promise<PendingKeyBundleDetails[]> {
    const bundles = await this.olmMachine.getAllRoomsPendingKeyBundles();

    return bundles.map((details) => ({
      inviteAcceptedTs: details.inviteAcceptedAtMillis,
      inviter: details.inviterId.toString(),
      roomId: details.roomId.toString(),
    }));
  }

  async importRoomKeysFromJson(
    roomKeys: string,
    progress: (progress: bigint, total: bigint) => void,
  ): Promise<RoomKeysImportResult> {
    const r = await this.olmMachine.importExportedRoomKeys(roomKeys, progress);
    return {
      imported: r.importedCount,
      total: r.totalCount,
    };
  }

  async exportRoomKeysToJson(): Promise<string> {
    const keysJSON = await this.olmMachine.exportRoomKeys(() => true);
    return keysJSON;
  }
}
