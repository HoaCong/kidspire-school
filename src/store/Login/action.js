import * as ActionTypes from "./constant";

export const actionLogin = (params) => ({
  type: ActionTypes.LOGIN,
  params,
});

export const actionLoginSuccess = (payload) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const actionLoginFailed = (payload) => ({
  type: ActionTypes.LOGIN_FAILED,
  payload,
});

export const actionReset = () => ({
  type: ActionTypes.RESET_LOGIN,
});
