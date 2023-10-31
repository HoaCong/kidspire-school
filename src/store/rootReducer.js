// declare redux
// Created by Man Nguyen
// 19/10/2023

/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import searchOrdersReducer from "./searchOrders/reducer";

const rootReducer = combineReducers({
  searchOrdersReducer,
});

export default rootReducer;
