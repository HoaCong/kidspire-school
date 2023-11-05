import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import { actionGetListFailed, actionGetListSuccess } from "./action";
import * as ActionTypes from "./constant";

function* callApiListUser({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_USER, params);
    console.log("function*callApiLogin  response:", response);
    yield put(actionGetListSuccess(response.data));
  } catch (error) {
    console.log("function*callApiLogin  error:", error);
    yield put(actionGetListFailed(error.response.data.error));
  }
}

export default function* userSaga() {
  yield all([yield takeLeading(ActionTypes.LIST, callApiListUser)]);
}
