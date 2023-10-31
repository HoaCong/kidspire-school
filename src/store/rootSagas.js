// declare saga
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo Saga */
import { all, fork } from "redux-saga/effects";

import searchOrdersSaga from "./searchOrders/saga";

export default function* rootSaga() {
  yield all([fork(searchOrdersSaga)]);
}
