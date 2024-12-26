export type MatrixEndpointPathParams = Record<string, string>;
export type MatrixEndpointSearchParams = Record<string, string>;

export interface MatrixEndpointContext {
  pathParams?: MatrixEndpointPathParams;
  searchParams?: MatrixEndpointSearchParams;
  body?: unknown;
}

export type MatrixEndpointStruct = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  rateLimited?: true;
  requireAuthentication?: true;
  body?: string | FormData | Blob;
};

export type MatrixRequestStruct = MatrixEndpointStruct;

export type MatrixEndpoint<
  C extends MatrixEndpointContext | undefined = undefined,
> = C extends MatrixEndpointContext
  ? (ctx: C) => MatrixEndpointStruct
  : () => MatrixEndpointStruct;
