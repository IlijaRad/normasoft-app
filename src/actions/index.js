import { BASE_URL, APP_ID } from "../constants/api";
import { GET_POST, GET_POSTS, CREATE_POST, GET_COMMENTS } from "./types";

import getUUID from "../helpers/getUUID";

export const getPosts = () => {
  return async function (dispatch) {
    const result = await fetch(BASE_URL + "post", {
      method: "GET",
      headers: {
        "app-id": APP_ID,
      },
    });
    const json = await result.json();
    const { data } = json;

    dispatch({ type: GET_POSTS, payload: data });
  };
};

export const getPostById = (id) => {
  return async function (dispatch) {
    const result = await fetch(`${BASE_URL}post/${id}`, {
      method: "GET",
      headers: {
        "app-id": APP_ID,
      },
    });
    const json = await result.json();
    const data = json;

    dispatch({ type: GET_POST, payload: data });
  };
};

export const createPost = (text, firstName, lastName, tags) => {
  return {
    type: CREATE_POST,
    payload: {
      id: getUUID(),
      text,
      publishDate: new Date().toISOString(),
      owner: {
        firstName,
        lastName,
      },
      tags,
      image: "/img/post.png",
    },
  };
};

export const getCommentsByPostId = (id) => {
  return async function (dispatch) {
    const result = await fetch(`${BASE_URL}post/${id}/comment`, {
      method: "GET",
      headers: {
        "app-id": APP_ID,
      },
    });
    const json = await result.json();
    const { data } = json;

    dispatch({ type: GET_COMMENTS, payload: data });
  };
};
