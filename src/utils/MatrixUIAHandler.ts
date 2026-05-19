import { MatrixError, parseMatrixResp } from "../matrix-request";
import { ObservableValue } from "./observable";

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
 * - suspend execution until retry() is called
 * - retry request with auth dict
 */
export class MatrixUIAHandler {
  private readonly publishKey = Math.random().toString();

  public readonly observable = new ObservableValue<
    MatrixError<MatrixUIAData> | undefined
  >(undefined, this.publishKey);

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
  ): Promise<Record<string, unknown>> {
    return new Promise((resolve) => {
      this.observable.publish(this.publishKey, error);

      this.pendingRetryResolver = resolve;
    });
  }

  private pendingRetryResolver?: (auth: Record<string, unknown>) => void;

  /**
   * Retries the suspended UIA request with auth data.
   */
  retry(auth: Record<string, unknown>): void {
    if (!this.pendingRetryResolver) {
      throw new Error("No pending UIA request to retry");
    }

    const resolve = this.pendingRetryResolver;

    this.pendingRetryResolver = undefined;

    resolve(auth);
  }
}
