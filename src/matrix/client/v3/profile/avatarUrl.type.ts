/**
 * avatarUrl types
 */
export type AvatarUrlPathParams = {
  userId: string;
};
export type AvatarUrlOK = {
  avatar_url: string;
};

/**
 * putAvatarUrl types
 */
export type PutAvatarUrlPathParams = {
  userId: string;
};
export type PutAvatarUrlBody = {
  avatar_url: string;
};
