import { ENDPOINT } from "constants/routerApi";
import { get, post, put as puts, remove } from "helper/ajax";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionAddTopicFailed,
  actionAddTopicSuccess,
  actionDeleteTopicFailed,
  actionDeleteTopicSuccess,
  actionEditTopicFailed,
  actionEditTopicSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiListTopic({ params }) {
  try {
    const response = yield call(get, ENDPOINT.LIST_TOPIC, params);
    console.log("function*callApiListTopic  response:", response);
    yield put(actionGetListSuccess(response.data));
  } catch (error) {
    console.log("function*callApiListTopic  error:", error);
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiAddTopic({ params }) {
  try {
    const response = yield call(post, ENDPOINT.ADD_TOPIC, params);
    console.log("function*callApiEditTopic  response:", response);
    yield put(actionAddTopicSuccess(response.data.data));
    yield put(
      addToast({
        text: response.data.message,
        type: "success",
        title: "",
      })
    );
  } catch (error) {
    console.log("function*callApiListTopic  error:", error);
    yield put(actionAddTopicFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Add topic failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEditTopic({ params }) {
  try {
    const { id, name, image } = params;
    const response = yield call(puts, ENDPOINT.EDIT_TOPIC + id, {
      name,
      image,
    });
    console.log("function*callApiEditTopic  response:", response);
    yield put(actionEditTopicSuccess(response.data.data));
    yield put(
      addToast({
        text: response.data.message,
        type: "success",
        title: "",
      })
    );
  } catch (error) {
    console.log("function*callApiListTopic  error:", error);
    yield put(actionEditTopicFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update topic failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDeleteTopic({ id }) {
  try {
    const response = yield call(remove, ENDPOINT.DELETE_TOPIC + id);
    console.log("function*callApiEditTopic  response:", response);
    yield put(actionDeleteTopicSuccess(id));
    yield put(
      addToast({
        text: response.data.message,
        type: "success",
        title: "",
      })
    );
  } catch (error) {
    console.log("function*callApiListTopic  error:", error);
    yield put(actionDeleteTopicFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update topic failed",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* topicSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiListTopic),
    yield takeLatest(ActionTypes.ADD, callApiAddTopic),
    yield takeLatest(ActionTypes.EDIT, callApiEditTopic),
    yield takeLatest(ActionTypes.DELETE, callApiDeleteTopic),
  ]);
}
