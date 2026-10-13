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

type RetryOptions = {
  maxRetries?: number;
  defaultRetryAfterMs?: number;
};

type SleepFn = (ms: number) => Promise<void>;

/**
 * Executes async operations with Matrix rate-limit retry handling.
 *
 * Retries when:
 * - HTTP status is 429
 * - errcode is M_LIMIT_EXCEEDED
 */
export class MatrixRequestRetrier {
  private readonly options: RetryOptions;
  private readonly sleep: SleepFn;

  constructor(sleep: SleepFn, options: RetryOptions = {}) {
    this.sleep = sleep;
    this.options = options;
  }

  async execute(operation: () => Promise<Response>): Promise<Response> {
    const maxRetries = this.options.maxRetries ?? 5;
    const defaultRetryAfterMs = this.options.defaultRetryAfterMs ?? 5000;

    let retries = 0;

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const response = await operation();

      const rateLimited = await MatrixRequestRetrier.isRateLimited(response);

      if (!rateLimited) {
        return response;
      }

      if (retries >= maxRetries) {
        throw new Error("Maximum retries exceeded for rate limited request");
      }

      retries += 1;

      const retryAfterMs = await MatrixRequestRetrier.getRetryAfterMs(response);

      await this.sleep(retryAfterMs ?? defaultRetryAfterMs);
    }
  }

  static async isRateLimited(response: Response): Promise<boolean> {
    if (response.status !== 429) {
      return false;
    }

    try {
      const body = await response.clone().json();

      return body?.errcode === "M_LIMIT_EXCEEDED";
    } catch {
      return false;
    }
  }

  static async getRetryAfterMs(
    response: Response,
  ): Promise<number | undefined> {
    try {
      const body = await response.clone().json();

      if (
        typeof body?.retry_after_ms === "number" &&
        body.retry_after_ms >= 0
      ) {
        return body.retry_after_ms;
      }
    } catch {
      // ignore malformed response body
    }
  }
}
