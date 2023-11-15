import { ENDPOINT } from "constants/routerApi";
import { get, post, put as puts } from "helper/ajax";
import _omit from "lodash/omit";
import { all, call, put, takeLatest, takeLeading } from "redux-saga/effects";
import { addToast } from "store/Toast/action";
import {
  actionAddFailed,
  actionAddSuccess,
  actionDeleteFailed,
  actionDeleteSuccess,
  actionEditFailed,
  actionEditSuccess,
  actionGetListFailed,
  actionGetListSuccess,
} from "./action";
import * as ActionTypes from "./constant";
function* callApiList({ params }) {
  try {
    const response = yield call(
      get,
      ENDPOINT.LIST_USER,
      _omit(params, ["limit"])
    );
    yield put(actionGetListSuccess(response.data));
  } catch (error) {
    yield put(actionGetListFailed(error.response.data.error));
  }
}

function* callApiAdd({ params }) {
  try {
    const response = yield call(post, ENDPOINT.ADD_USER, params);
    yield put(actionAddSuccess(response.data.data));
    yield put(
      addToast({
        text: response.data.message,
        type: "success",
        title: "",
      })
    );
  } catch (error) {
    yield put(actionAddFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Add user failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiEdit({ params }) {
  try {
    const { id } = params;
    const response = yield call(puts, ENDPOINT.EDIT_USER + id, params);
    yield put(actionEditSuccess(response.data.data));
    yield put(
      addToast({
        text: response.data.message,
        type: "success",
        title: "",
      })
    );
  } catch (error) {
    yield put(actionEditFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update user failed",
        type: "danger",
        title: "",
      })
    );
  }
}

function* callApiDelete({ id }) {
  try {
    const response = yield call(puts, ENDPOINT.ACTIVE_USER + id);
    yield put(actionDeleteSuccess(id));
    yield put(
      addToast({
        text: response.data.message,
        type: "success",
        title: "",
      })
    );
  } catch (error) {
    yield put(actionDeleteFailed(error.response.data.error));
    yield put(
      addToast({
        text: "Update user failed",
        type: "danger",
        title: "",
      })
    );
  }
}

export default function* userSaga() {
  yield all([
    yield takeLeading(ActionTypes.LIST, callApiList),
    yield takeLatest(ActionTypes.ADD, callApiAdd),
    yield takeLatest(ActionTypes.EDIT, callApiEdit),
    yield takeLatest(ActionTypes.DELETE, callApiDelete),
  ]);
}
