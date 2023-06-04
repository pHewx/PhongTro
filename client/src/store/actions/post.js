import actionTypes from "./actionTypes";
import {
  apiCreateNewPost,
  apiGetMyPost,
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
  apiUpdateMyPost,
} from "../../services/post";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};
export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.response?.rows,
        count: response.data.response?.count,
      });
    } else {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
    });
  }
};
export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        newPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_NEW_POST,
        msg: response.data.msg,
        newPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POST,
      newPosts: null,
    });
  }
};

export const getMyPosts = (query) => async (dispatch) => {
  try {
    const response = await apiGetMyPost(query);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.GET_MY_POST,
        myPosts: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_MY_POST,
        msg: response.data.msg,
        myPosts: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MY_POST,
      myPosts: null,
    });
  }
};

export const updateMyPosts = (data) => async (dispatch) => {
  try {
    const response = await apiUpdateMyPost(data);
    if (response?.data.err === 0) {
      dispatch({
        type: actionTypes.UPDATE_MY_POST,
        myPost: response.data.response,
      });
    } else {
      dispatch({
        type: actionTypes.GET_MY_POST,
        msg: response.data.msg,
        myPost: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_MY_POST,
      myPost: null,
    });
  }
};
