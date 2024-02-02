export type MatrixRequestStruct = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  rateLimited?: true;
  requireAuthentication?: true;
  body?: string;
};
