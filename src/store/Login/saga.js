import { ENDPOINT } from "constants/routerApi";
import { post } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLoginFailed, actionLoginSuccess } from "./action";
import * as ActionTypes from "./constant";

function* callApiLogin({ params, isRemember }) {
  try {
    const response = yield call(post, ENDPOINT.LOGIN, params);
    if (isRemember)
      localStorage.setItem("access_token", response.data.access_token);
    yield put(actionLoginSuccess(response.data));
  } catch (error) {
    yield put(actionLoginFailed(error.response.data.error));
  }
}

export default function* loginSaga() {
  yield all([yield takeLeading(ActionTypes.LOGIN, callApiLogin)]);
}
