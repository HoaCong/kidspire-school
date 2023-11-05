import { ENDPOINT } from "constants/routerApi";
import { get } from "helper/ajax";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import { actionGetListFailed, actionGetListSuccess } from "./action";
import * as ActionTypes from "./constant";

function* callApiListTopic({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_TOPIC, params);
    console.log("function*callApiLogin  response:", response);
    yield put(actionGetListSuccess(response.data));
  } catch (error) {
    console.log("function*callApiLogin  error:", error);
    yield put(actionGetListFailed(error.response.data.error));
  }
}

export default function* topicSaga() {
  yield all([yield takeLeading(ActionTypes.LIST, callApiListTopic)]);
}
