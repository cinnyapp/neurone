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
  EphemeralEvent,
  TypingEphemeralEvent,
  ReceiptEphemeralEvent,
} from "../../../../api/types";
import { JoinRoom } from "../../../../api/matrix/client/v3/sync";

export const roomEphemeral = (joinRoom: JoinRoom): EphemeralEvent[] =>
  joinRoom.ephemeral?.events ?? [];

export const roomTypingEphemeral = (
  events: EphemeralEvent[],
): TypingEphemeralEvent | undefined =>
  events.find<TypingEphemeralEvent>(
    (event): event is TypingEphemeralEvent => event.type === "m.typing",
  );

export const roomReceiptEphemeral = (
  events: EphemeralEvent[],
): ReceiptEphemeralEvent | undefined =>
  events.find<ReceiptEphemeralEvent>(
    (event): event is ReceiptEphemeralEvent => event.type === "m.receipt",
  );
