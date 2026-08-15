export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000';
export const AUTH_TOKEN_STORAGE_KEY = 'access_token';
export const PROFILES_ENDPOINT = '/profiles';
export const PROFILE_COUNTS_ENDPOINT = '/profile-counts';
export const BRIDES_ENDPOINT = `${PROFILES_ENDPOINT}/brides`;
export const GROOMS_ENDPOINT = `${PROFILES_ENDPOINT}/grooms`;
export const WIDOW_PROFILES_ENDPOINT = '/window';
export const profileByIdEndpoint = (profileId) => (
  `${PROFILES_ENDPOINT}/${encodeURIComponent(profileId)}`
);
