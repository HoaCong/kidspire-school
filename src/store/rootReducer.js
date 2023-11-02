/* quy phạm khai báo rootReducer */
import { combineReducers } from "redux";

import loginReducer from "./Login/reducer";

const rootReducer = combineReducers({
  loginReducer,
});

export default rootReducer;

