export type MatrixEndpointPathParams = Record<string, string>;
export type SearchParamPrimitive = string | number | boolean | null;
export type SearchParamValue =
  | SearchParamPrimitive
  | readonly SearchParamPrimitive[]
  | undefined;
export type MatrixEndpointSearchParams = Record<string, SearchParamValue>;

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

export type MatrixEndpoint<C extends MatrixEndpointContext> = (
  ctx: C,
) => MatrixEndpointStruct;
