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

export type EphemeralEvent<Content extends object = object> = {
  content: Content;
  type: string;
};

export type TypingContent = {
  user_ids: string[];
};

export type TypingEphemeralEvent = EphemeralEvent<TypingContent> & {
  type: "m.typing";
};

export type Receipt = {
  thread_id?: string;
  ts?: number;
};

export type ReceiptContent = Record<
  string,
  {
    "m.read"?: Record<string, Receipt>;
    "m.read.private"?: Record<string, Receipt>;
  }
>;

export type ReceiptEphemeralEvent = EphemeralEvent<ReceiptContent> & {
  type: "m.receipt";
};
