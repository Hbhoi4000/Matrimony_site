export const HOME_ROUTE = '/';
export const LOGIN_ROUTE = '/login';
export const REGISTER_ROUTE = '/register';
export const BRIDES_ROUTE = '/bride';
export const GROOMS_ROUTE = '/groom';
export const WIDOWS_ROUTE = '/widow';
export const ABOUT_ROUTE = '/about';
export const CONTACT_ROUTE = '/contact';
export const profileRoute = (profileId = ':id') => `/profile/${encodeURIComponent(profileId)}`;
