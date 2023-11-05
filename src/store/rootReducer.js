/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import categoryReducer from "./Category/reducer";
import loginReducer from "./Login/reducer";
import toastReducer from "./Toast/reducer";
import topicReducer from "./Topic/reducer";
import userReducer from "./User/reducer";

const rootReducer = combineReducers({
  loginReducer,
  toastReducer,
  userReducer,
  topicReducer,
  categoryReducer,
});

export default rootReducer;
