import { ENDPOINT } from "constants/routerApi";
import { post } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionLoginFailed,
  actionLoginSuccess,
  actionRegisterFailed,
  actionRegisterSuccess,
} from "./action";
import * as ActionTypes from "./constant";

function* callApiLogin({ params, isRemember }) {
  try {
    const response = yield call(post, ENDPOINT.LOGIN, params);
    console.log("function*callApiLogin  response:", response);
    if (isRemember)
      localStorage.setItem("access_token", response.data.access_token);
    yield put(actionLoginSuccess(response.data));
  } catch (error) {
    console.log("function*callApiLogin  error:", error);
    yield put(actionLoginFailed(error.response.data.error));
  }
}

function* callApiRegister({ params }) {
  try {
    const response = yield call(post, ENDPOINT.REGISTER, params);
    yield put(
      addToast({
        text: "Đăng ký thành công",
        type: "success",
        title: "",
      })
    );
    yield put(actionRegisterSuccess(response.data));
  } catch (error) {
    console.log("function*callApiRegister  error:", error);
    yield put(
      addToast({
        text: "Đăng ký thất bại",
        type: "danger",
        title: "",
      })
    );
    yield put(actionRegisterFailed(error.response.data.error));
  }
}

export default function* loginSaga() {
  yield all([
    yield takeLeading(ActionTypes.LOGIN, callApiLogin),
    yield takeLeading(ActionTypes.REGISTER, callApiRegister),
  ]);
}
