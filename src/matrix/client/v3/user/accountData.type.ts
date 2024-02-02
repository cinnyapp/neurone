/**
 * accountData types
 */
export type AccountDataPathParams = {
  userId: string;
  type: string;
};

export type AccountDataOK<Content extends object> = Content;

/**
 * putAccountData types
 */
export type PutAccountDataPathParams = {
  userId: string;
  type: string;
};

export type PutAccountDataBody<Content extends object> = Content;

export type PutAccountDataOK = Record<string, never>;
