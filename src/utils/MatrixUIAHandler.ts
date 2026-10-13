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

import { MatrixError, parseMatrixResp } from "../matrix-request";
import { Observable } from "./observable";

export interface MatrixUIAData {
  errcode?: string;
  error?: string;

  session?: string;
  flows: Array<{
    stages: string[];
  }>;

  completed?: string[];
  params?: Record<string, unknown>;
}

/**
 * Handles Matrix User-Interactive Authentication (UIA).
 *
 * Responsibilities:
 * - detect UIA responses
 * - publish UIA request state
 * - suspend execution until retry() or clear() is called
 * - retry request with auth dict
 * - clear request
 */
export class MatrixUIAHandler {
  private readonly publishKey = Math.random().toString();

  public readonly onUIA = new Observable<MatrixUIAData>(this.publishKey);

  async execute(
    request: (auth?: object) => Promise<Response>,
  ): Promise<Response> {
    let auth: object | undefined;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await request(auth);

      const uiaError = await this.extractUIAError(response);

      if (!uiaError) {
        return response;
      }

      auth = await this.waitForRetry(uiaError);

      if (!auth) {
        return response;
      }
    }
  }

  private async extractUIAError(
    response: Response,
  ): Promise<MatrixError<MatrixUIAData> | undefined> {
    if (response.status !== 401) {
      return undefined;
    }

    try {
      const [err] = await parseMatrixResp(response.clone());
      const data = err?.data;

      if (data && "flows" in data && Array.isArray(data.flows)) {
        return err as MatrixError<MatrixUIAData>;
      }
    } catch {
      // ignore malformed body
    }

    return undefined;
  }

  private waitForRetry(
    error: MatrixError<MatrixUIAData>,
  ): Promise<object | undefined> {
    return new Promise((resolve) => {
      this.onUIA.publish(this.publishKey, error.data);

      this.pendingRetryResolver = (auth?: object) => {
        resolve(auth);
      };
    });
  }

  private pendingRetryResolver?: (auth?: object) => void;

  /**
   * Retries the suspended UIA request with auth data.
   */
  retry(auth: object): void {
    const resolve = this.pendingRetryResolver;
    this.pendingRetryResolver = undefined;

    resolve?.(auth);
  }

  /**
   * Clear suspended UIA auth data request.
   */
  clear(): void {
    const resolve = this.pendingRetryResolver;
    this.pendingRetryResolver = undefined;

    resolve?.();
  }
}
