import produce from "immer";
import * as ActionTypes from "./constant";

const status = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
};
// DEFAULT STATE
const initialState = {
  dashboardStatus: { ...status },
  staticQuizStatus: { ...status },
  dashboard: {
    totalQuiz: 0,
    totalQuestion: 0,
    totalUser: 0,
    totalCategory: 0,
    totalLesson: 0,
  },
  staticQuiz: [],
};

const dashboardReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.DASHBOARD:
        draft.dashboardStatus.isLoading = true;
        draft.dashboardStatus.isSuccess = false;
        draft.dashboardStatus.isFailure = false;
        break;

      case ActionTypes.DASHBOARD_SUCCESS:
        draft.dashboardStatus.isLoading = false;
        draft.dashboardStatus.isSuccess = true;
        draft.dashboard = action.payload;
        break;

      case ActionTypes.DASHBOARD_FAILED:
        draft.dashboardStatus.isLoading = false;
        draft.dashboardStatus.isFailure = true;
        draft.dashboard = {};
        break;

      case ActionTypes.STATIC_QUIZ:
        draft.staticQuizStatus.isLoading = true;
        draft.staticQuizStatus.isSuccess = false;
        draft.staticQuizStatus.isFailure = false;
        break;

      case ActionTypes.STATIC_QUIZ_SUCCESS:
        draft.staticQuizStatus.isLoading = false;
        draft.staticQuizStatus.isSuccess = true;
        draft.staticQuiz = action.payload;
        break;

      case ActionTypes.STATIC_QUIZ_FAILED:
        draft.staticQuizStatus.isLoading = false;
        draft.staticQuizStatus.isFailure = true;
        draft.staticQuiz = {};
        break;

      default:
        return state;
    }
  });
};

export default dashboardReducer;
