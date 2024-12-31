import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * postSignaturesUpload types
 */
export type PostSignaturesUploadBody = Record<string, Record<string, object>>;
export type PostSignaturesUploadOK = {
  features?: Record<string, Record<string, object>>;
};
export type PostSignaturesUploadEndpoint = MatrixEndpoint<{
  body: PostSignaturesUploadBody;
}>;
