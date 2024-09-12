export type User = {
  avatar_url?: string;
  display_name?: string;
  user_id: string;
};

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
