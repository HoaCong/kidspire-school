import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const initialState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  data: { token: "" },
};

const loginReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LOGIN:
        draft.isLoading = true;
        draft.isSuccess = false;
        draft.isFailure = false;
        break;

      case ActionTypes.LOGIN_SUCCESS:
        draft.isLoading = false;
        draft.isSuccess = true;
        draft.data = action.payload;
        break;

      case ActionTypes.LOGIN_FAILED:
        draft.isLoading = false;
        draft.isFailure = true;
        draft.data = { token: "" };
        break;

      case ActionTypes.RESET_LOGIN:
        return initialState;

      default:
        return state;
    }
  });
};

export default loginReducer;
