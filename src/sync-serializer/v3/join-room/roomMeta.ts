import { RoomSummary, StateEvent } from "../../../api/types";
import { RoomMeta } from "./roomMeta.type";

export const serializeRoomMeta = (
  roomId: string,
  stateEvents: StateEvent[],
  roomSummary?: RoomSummary,
): RoomMeta => {
  const roomMeta: RoomMeta = {
    roomId,
  };

  if (Array.isArray(roomSummary?.["m.heroes"])) {
    roomMeta.heros = roomSummary["m.heroes"];
  }

  if (typeof roomSummary?.["m.joined_member_count"] === "number") {
    roomMeta.memberCount = roomSummary["m.joined_member_count"];
  }

  stateEvents.forEach((stateEvent) => {
    const { type, state_key, content } = stateEvent;

    switch (type) {
      case "m.room.avatar":
        if (
          state_key === "" &&
          "url" in content &&
          typeof content.url === "string"
        ) {
          roomMeta.avatar = content.url;
        }
        return;

      case "m.room.name":
        if (
          state_key === "" &&
          "name" in content &&
          typeof content.name === "string"
        ) {
          roomMeta.name = content.name;
        }
        return;

      case "m.room.topic":
        if (
          state_key === "" &&
          "topic" in content &&
          typeof content.topic === "string"
        ) {
          roomMeta.topic = content.topic;
        }
        return;

      case "m.room.canonical_alias":
        if (
          state_key === "" &&
          "alias" in content &&
          typeof content.alias === "string"
        ) {
          roomMeta.canonicalAlias = content.alias;
        }
        return;

      case "m.room.encryption":
        if (state_key === "") {
          roomMeta.encryption = true;
        }
        return;

      case "m.room.join_rules":
        if (
          state_key === "" &&
          "join_rule" in content &&
          typeof content.join_rule === "string"
        ) {
          roomMeta.joinRule = content.join_rule;
        }
        return;

      case "m.room.history_visibility":
        if (
          state_key === "" &&
          "history_visibility" in content &&
          typeof content.history_visibility === "string"
        ) {
          roomMeta.historyVisibility = content.history_visibility;
        }
        return;

      case "m.room.guest_access":
        if (
          state_key === "" &&
          "guest_access" in content &&
          typeof content.guest_access === "string"
        ) {
          roomMeta.guestAccess = content.guest_access;
        }
        return;
    }
  });

  return roomMeta;
};
