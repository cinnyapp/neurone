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

import { withSearchParams } from "../../../../utils";
import {
  GetRelationsEndpoint,
  GetRelationsRelEndpoint,
  GetRelationsRelTypeEndpoint,
} from "./relations.type";

/**
 * https://spec.matrix.org/v1.10/client-server-api/#get_matrixclientv1roomsroomidrelationseventid
 */
export const getRelations: GetRelationsEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/relations/${encodeURIComponent(pathParams.eventId)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.10/client-server-api/#get_matrixclientv1roomsroomidrelationseventidreltype
 */
export const getRelationsRelType: GetRelationsRelEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/relations/${encodeURIComponent(pathParams.eventId)}/${encodeURIComponent(pathParams.relType)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};

/**
 * https://spec.matrix.org/v1.10/client-server-api/#get_matrixclientv1roomsroomidrelationseventidreltypeeventtype
 */
export const getRelationsRelTypeEventType: GetRelationsRelTypeEndpoint = ({
  pathParams,
  searchParams,
}) => {
  const path = withSearchParams(
    `/_matrix/client/v1/rooms/${encodeURIComponent(pathParams.roomId)}/relations/${encodeURIComponent(pathParams.eventId)}/${encodeURIComponent(pathParams.relType)}/${encodeURIComponent(pathParams.eventType)}`,
    searchParams,
  );

  return {
    method: "GET",
    path,
    requireAuthentication: true,
  };
};
