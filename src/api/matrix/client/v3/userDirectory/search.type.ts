import { MatrixEndpoint } from "../../../../MatrixEndpoint";
import { User } from "../../../../types";

/**
 * postSearch types
 */
export type PostSearchBody = {
  limit?: number;
  search_term: string;
};

export type PostSearchOK = {
  limited: boolean;
  results: User[];
};

export type PostSearchEndpoint = MatrixEndpoint<{
  body: PostSearchBody;
}>;
