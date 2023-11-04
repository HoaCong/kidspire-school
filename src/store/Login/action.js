import * as ActionTypes from "./constant";

export const actionLogin = (params, isRemember = false) => ({
  type: ActionTypes.LOGIN,
  params,
  isRemember,
});

export const actionLoginSuccess = (payload) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const actionLoginFailed = (error) => ({
  type: ActionTypes.LOGIN_FAILED,
  error,
});

export const actionLogout = () => ({
  type: ActionTypes.LOGOUT,
});
