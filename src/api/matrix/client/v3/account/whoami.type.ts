import { MatrixEndpoint } from "../../../../MatrixEndpoint";

/**
 * getWhoami types
 */
export type GetWhoamiOK = {
  device_id?: string;
  is_guest?: boolean;
  user_id: string;
};
export type GetWhoamiEndpoint = MatrixEndpoint<object>;
