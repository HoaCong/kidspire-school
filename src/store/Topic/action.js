import * as ActionTypes from "./constant";

export const actionGetList = (params) => ({
  type: ActionTypes.LIST,
  params,
});

export const actionGetListSuccess = (payload) => ({
  type: ActionTypes.LIST_SUCCESS,
  payload,
});

export const actionGetListFailed = (error) => ({
  type: ActionTypes.LIST_FAILED,
  error,
});

export const actionAddTopic = (params) => ({
  type: ActionTypes.ADD,
  params,
});

export const actionAddTopicSuccess = (payload) => ({
  type: ActionTypes.ADD_SUCCESS,
  payload,
});

export const actionAddTopicFailed = (error) => ({
  type: ActionTypes.ADD_FAILED,
  error,
});

export const actionEditTopic = (params) => ({
  type: ActionTypes.EDIT,
  params,
});

export const actionEditTopicSuccess = (payload) => ({
  type: ActionTypes.EDIT_SUCCESS,
  payload,
});

export const actionEditTopicFailed = (error) => ({
  type: ActionTypes.EDIT_FAILED,
  error,
});

export const actionDeleteTopic = (id) => ({
  type: ActionTypes.DELETE,
  id,
});

export const actionDeleteTopicSuccess = (id) => ({
  type: ActionTypes.DELETE_SUCCESS,
  id,
});

export const actionDeleteTopicFailed = (error) => ({
  type: ActionTypes.DELETE_FAILED,
  error,
});
