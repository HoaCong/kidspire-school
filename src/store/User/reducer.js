import produce from "immer";
import * as ActionTypes from "./constant";

// DEFAULT STATE
const initialState = {
  isLoading: false,
  isSuccess: false,
  isFailure: false,
  list: [],
  params: { limit: 10, page: 1 },
  meta: {
    total: 0,
  },
};

const userReducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.LIST:
        draft.isLoading = true;
        draft.isSuccess = false;
        draft.isFailure = false;
        draft.params.page = action.params.page;
        break;

      case ActionTypes.LIST_SUCCESS:
        draft.isLoading = false;
        draft.isSuccess = true;
        draft.list = action.payload.data;
        draft.meta.total = action.payload.total;
        break;

      case ActionTypes.LIST_FAILED:
        draft.isLoading = false;
        draft.isFailure = true;
        draft.list = [];
        break;

      default:
        return state;
    }
  });
};

export default userReducer;
