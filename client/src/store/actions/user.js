import actionTypes from "./actionTypes";
import * as apis from "../../services";

export const getCurrent = () => async (dispatch) => {
  try {
    const response = await apis.apiGetCurrent();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CURRENT,
        msg: response.data.msg,
        currentData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CURRENT,
      currentData: null,
      msg: error,
    });
  }
};

export const updateCurrent = (payload) => async (dispatch) => {
  try {
    const response = await apis.apiUpdateCurrent(payload);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_CURRENT,
        currentData: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_CURRENT,
        msg: response.data.msg,
        currentData: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_CURRENT,
      currentData: null,
      msg: error,
    });
  }
};
