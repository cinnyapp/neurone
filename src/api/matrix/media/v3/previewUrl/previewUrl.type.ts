import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getPreviewUrl types
 */
export type GetPreviewUrlSearchParams = {
  url: string;
  ts?: string;
};
export type GetPreviewUrlOK = object;
export type GetPreviewUrlEndpoint = MatrixEndpoint<{
  searchParams: GetPreviewUrlSearchParams;
}>;
