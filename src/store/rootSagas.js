/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";

import categorycSaga from "./Category/saga";
import lessonSaga from "./Lesson/saga";
import loginSaga from "./Login/saga";
import questionSaga from "./Question/saga";
import topicSaga from "./Topic/saga";
import userSaga from "./User/saga";

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(userSaga),
    fork(topicSaga),
    fork(categorycSaga),
    fork(lessonSaga),
    fork(questionSaga),
  ]);
}
