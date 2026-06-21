```ts
const olmMachine: OlmMachine;
const outgoingRequests: OutgoingRequests;

const verificationManager = new VerificationManager(
  olmMachine,
  outgoingRequests,
);

const onVerificationRequest = (verificationFlow: OutboundVerification | InboundVerification) => {
  // use verificationFlow to render UI
};

// Receiving verification request
const onSyncData = (syncData) => {
  const toDeviceEvents = syncData.to_device.events;

  const processedToDeviceEvents = await SyncChanges.receive(...);
  processedToDeviceEvents.forEach((event) => {
    verificationManager.receiveToDeviceEvent(event, onVerificationRequest);
  })

  const roomIdToJoinRooms = syncData.rooms.join;
  Object.keys(roomIdToJoinRooms).forEach((roomId) => {
    const joinRoom = roomIdToJoinRooms[roomId];
    const timelineEvents = roomTimeline(joinRoom);

    // FIXME: NOTE: make sure to decrypt event
    // before sending it to verificationManager.

    timelineEvents.forEach((event) => {
      verificationManager.receiveUserVerificationEvent(
        roomId,
        event,
        onVerificationRequest,
      );
    });
  });
};

// Send verification request to unverified device.
const onPressVerifyOtherDevice = async (userId: string, deviceId: string) => {
  const verificationFlow =
    await verificationManager.requestDeviceVerification(userId, deviceId, ["m.sas.v1"]);
};
```
