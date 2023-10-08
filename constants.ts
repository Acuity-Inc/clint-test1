// Event handlers
export const EVENTS = {
  SIGN_IN_SUCCESS: 'signInSuccess',
  SIGN_OUT_SUCCESS: 'signOutSuccess',
  ON_ERROR: 'onError',
  ON_CANCELLED: 'onCancelled',
};

// Configurations
export const CONFIGURATIONS = {
  CLIENT_ID: '0oa7cc8va6cS53D41697',
  REDIRECT_URI: 'com.okta.demo-acuity-tech-challenge:/callback',
  END_SESSION_REDIRECT_URI: 'com.okta.demo-acuity-tech-challenge:/',
  DISCOVERY_URI: 'https://demo-acuity-tech-challenge.okta.com/oauth2/default',
  AUTHORIZED: 'authorized',
  ERROR: 'error',
  ACCESS_TOKEN: 'access token: ',
  OPEN_ID: 'openid',
  PROFILE: 'profile',
  OFFLINE_ACCESS: 'offline_access',
};

// Display Text
export const DISPLAY_TEXT = {
  USER_FAILED:
    'Failed to fetch user. Make sure you have logged in and access token is valid. Status Code: ',
  NO_ACCESS: 'There is no access token available!',
  REFRESH_SUCCESS: 'Successfully refreshed tokens: ',
  REFRESH_FAIL:
    'Failed to refresh tokens: Be sure Refresh Token grant type is enabled in your app in Okta, as well as the offline_access scope in samples.config.js',
  TITLE: 'Okta + React Native',
  USER_PROFILE: 'User Profile: ',
  LOGGED_IN: 'Logged in!',
  LOGGED_OUT: 'Logged out!',
};

// Control Titles
export const CONTROL_TITLES = {
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  GET_USER_FROM_ID_TOKEN: 'Get User From Id Token',
  GET_USER_FROM_REQUEST: 'Get User From Request',
  GET_USER_FROM_ACCESS_TOKEN: 'Get User From Access Token',
  REFRESH_TOKENS: 'Refresh Tokens',
  CLEAR_TEXT: 'Clear Text',
  CHECK_TOKEN: 'Check Token',
};

// Test IDs
export const TEST_IDS = {
  GET_USER_FROM_ID_TOKEN: 'getUserFromIdToken',
  GET_USER_FROM_REQUEST: 'getUserFromRequest',
  GET_USER_FROM_ACCESS_TOKEN: 'getMyUserFromAccessToken',
  REFRESH_MY_TOKENS: 'refreshMyTokens',
  CLEAR_BUTTON: 'clearButton',
  TITLE_LABEL: 'titleLabel',
  LOGOUT_BUTTON: 'logoutButton',
  LOGIN_BUTTON: 'loginButton',
  DESCRIPTION_BOX: 'descriptionBox',
  CHECK_TOKEN_BUTTON: 'checkAuth',
};

export const ENDPOINTS = {
  ROOT: 'http://localhost:8080/parents',
};
