export type UserProfile = {
  avatar_url?: string;
  display_name?: string;
};

/**
 * profile types
 */
export type ProfilePathParams = {
  userId: string;
};
export type ProfileOK = UserProfile;
