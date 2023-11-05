/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";

import categorycSaga from "./Category/saga";
import loginSaga from "./Login/saga";
import topicSaga from "./Topic/saga";
import userSaga from "./User/saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(userSaga),
    fork(topicSaga),
    fork(categorycSaga),
  ]);
}
