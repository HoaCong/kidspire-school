import { ENDPOINT } from "constants/routerApi";
import { post } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { actionLoginFailed, actionLoginSuccess } from "./action";
import * as ActionTypes from "./constant";

// function* callApiLogin({ params }) {
//   try {
//     const response = yield call(post, ENDPOINT.LOGIN, params);
//     yield put(actionLoginSuccess(response));
//   } catch (error) {
//     yield put(actionLoginFailed(error));
//   }
// }

function* callApiLogin({ params }) {
  try {
    const response = yield fetch(
      "https://web-english.onrender.com/api/" + ENDPOINT.LOGIN,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Đặt các headers khác ở đây nếu cần
        },
        body: JSON.stringify(params),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = yield response.json();
    yield put(actionLoginSuccess(data));
  } catch (error) {
    yield put(actionLoginFailed(error));
  }
}

export default function* loginSaga() {
  yield all([yield takeLeading(ActionTypes.LOGIN, callApiLogin)]);
}
