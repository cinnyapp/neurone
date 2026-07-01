import {
  DeviceId,
  initAsync,
  OlmMachine,
  UserId,
} from "@matrix-org/matrix-sdk-crypto-wasm";
import anotherjson from "another-json";
import { OutgoingRequestSender } from "./OutgoingRequestSender";
import { OutgoingRequests } from "./OutgoingRequests";
import { MatrixRequestRetrier } from "../../utils";
import { MachineEvents } from "./MachineEvents";
import { CrossSigning } from "./CrossSigning";
import { RoomEncryption } from "./RoomEncryption";
import { RoomKeys } from "./RoomKeys";
import { Secrets } from "./Secrets";
import { SyncChanges } from "./SyncChanges";
import { VerificationManager } from "./verification";
import { UserTracker } from "./user";
import { BackupManager } from "./backup";

export * from "./CrossSigning";
export * from "./MachineEvents";
export * from "./OutgoingRequests";
export * from "./OutgoingRequestSender";
export * from "./RoomEncryption";
export * from "./RoomKeys";
export * from "./Secrets";
export * from "./SyncChanges";
export * from "./types";
export * from "./utils";
export * as user from "./user";
export * as verification from "./verification";
export * as backup from "./backup";

export class Machine {
  private readonly olmMachine: OlmMachine;

  public readonly outgoingRequests: OutgoingRequests;

  public readonly crossSigning: CrossSigning;

  public readonly roomEncryption: RoomEncryption;

  public readonly roomKeys: RoomKeys;

  public readonly secrets: Secrets;

  public readonly syncChanges: SyncChanges;

  public readonly events: MachineEvents;

  public readonly verificationManager: VerificationManager;

  public readonly userTracker: UserTracker;

  public readonly backupManager: BackupManager;

  static async init(userId: string, deviceId: string): Promise<OlmMachine> {
    await initAsync();

    const olmMachine = await OlmMachine.initialize(
      new UserId(userId),
      new DeviceId(deviceId),
      `neurone${userId}`,
    );

    olmMachine.roomKeyRequestsEnabled = false;

    return olmMachine;
  }

  constructor(
    olmMachine: OlmMachine,
    outgoingSender: OutgoingRequestSender,
    retrier: MatrixRequestRetrier,
  ) {
    this.olmMachine = olmMachine;
    this.outgoingRequests = new OutgoingRequests(
      olmMachine,
      outgoingSender,
      retrier,
    );
    this.crossSigning = new CrossSigning(
      this.olmMachine,
      this.outgoingRequests,
    );
    this.roomEncryption = new RoomEncryption(this.olmMachine);
    this.roomKeys = new RoomKeys(this.olmMachine, this.outgoingRequests);
    this.secrets = new Secrets(this.olmMachine);
    this.syncChanges = new SyncChanges(this.olmMachine);
    this.verificationManager = new VerificationManager(
      this.olmMachine,
      this.outgoingRequests,
    );
    this.userTracker = new UserTracker(this.olmMachine, this.outgoingRequests);
    this.backupManager = new BackupManager(
      this.olmMachine,
      this.outgoingRequests,
    );
    this.events = new MachineEvents(this.olmMachine);
  }

  get creationTs(): number {
    return this.olmMachine.deviceCreationTimeMs;
  }

  getEncryptionKey(): string {
    return this.olmMachine.identityKeys.curve25519.toBase64();
  }

  getSigningKey(): string {
    return this.olmMachine.identityKeys.ed25519.toBase64();
  }

  async sign<
    T extends {
      signatures?: Record<string, Record<string, string>>;
      unsigned?: object;
    },
  >(obj: T): Promise<void> {
    const sigs = new Map(Object.entries(obj.signatures || {}));
    const unsigned = obj.unsigned;

    delete obj.signatures;
    delete obj.unsigned;

    const userId = this.olmMachine.userId.toString();

    const userSignatures = sigs.get(userId) || {};

    const canonalizedJson = anotherjson.stringify(obj);
    const signatures = await this.olmMachine.sign(canonalizedJson);

    const map = JSON.parse(signatures.asJSON());

    sigs.set(userId, { ...userSignatures, ...map[userId] });

    if (unsigned) obj.unsigned = unsigned;
    obj.signatures = Object.fromEntries(sigs.entries());
  }
}
