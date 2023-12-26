import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const initialState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  data: {
    totalQuiz: 0,
    totalQuestion: 0,
    totalUser: 0,
    totalCategory: 0,
    totalLesson: 0,
  },
};

const dashboardReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.DASHBOARD:
        draft.isLoading = true;
        draft.isSuccess = false;
        draft.isFailure = false;
        break;

      case ActionTypes.DASHBOARD_SUCCESS:
        draft.isLoading = false;
        draft.isSuccess = true;
        draft.data = action.payload;
        break;

      case ActionTypes.DASHBOARD_FAILED:
        draft.isLoading = false;
        draft.isFailure = true;
        draft.data = {};
        break;

      default:
        return state;
    }
  });
};

export default dashboardReducer;
