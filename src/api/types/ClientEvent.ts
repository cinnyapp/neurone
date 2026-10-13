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

export type UnsignedData<
  PrevContent extends object = object,
  RedirectedBecause extends MessageEvent = MessageEvent,
> = {
  age?: number;
  membership?: string;
  prev_content?: PrevContent;
  redacted_because?: RedirectedBecause;
  transaction_id?: string;
};

export type MessageEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = {
  event_id: string;
  room_id: string;
  sender: string;
  type: string;
  content: EventContent;
  origin_server_ts: number;
  unsigned?: UnsignedData;
};

export type StateEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = { state_key: string } & MessageEvent<EventContent, UnsignedData>;

export type ClientEvent<
  EventContent extends object = object,
  UnsignedData extends object = object,
> =
  | StateEvent<EventContent, UnsignedData>
  | MessageEvent<EventContent, UnsignedData>;

export type ClientEventWithoutRoomId<
  EventContent extends object = object,
  UnsignedData extends object = object,
> =
  | Omit<StateEvent<EventContent, UnsignedData>, "room_id">
  | Omit<MessageEvent<EventContent, UnsignedData>, "room_id">;

export type StateEventWithoutRoomId<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = Omit<StateEvent<EventContent, UnsignedData>, "room_id">;

export type MessageEventWithoutRoomId<
  EventContent extends object = object,
  UnsignedData extends object = object,
> = Omit<MessageEvent<EventContent, UnsignedData>, "room_id">;
