import axios from "axios";

export const findPost = (post) => (dispatch) => {
  dispatch({
    type: "SET_IS_LOAD_FALSE",
  });
  return dispatch({ type: "FIND_POSTS", payload: post });
};

export const fetchPosts = (pages) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
  try {
    dispatch({
      type: "SET_IS_LOAD_TRUE",
    });
    const res = await axios.get(
      `http://localhost:5656/posts?limit=3&page=${pages}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch({
      type: "SET_IS_LOAD_FALSE",
    });
    return dispatch({
      type: "FETCH_POSTS",
      payload: res.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const currentPost = (id) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
  try {
    const res = await axios.get(`http://localhost:5656/posts/${id}`, {
      headers: {
        Authorization: token,
      },
    });

    return dispatch({
      type: "CURRENT_POSTS",
      payload: res.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const addNewPost = (post, file) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
  try {
    let fileUrl;
    if (file) {
      let fileRes = await axios.post(
        "http://localhost:5656/posts/upload",
        file,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      fileUrl = fileRes.data.url;
    }
    const res = await axios.post(
      `http://localhost:5656/posts`,
      {
        title: post.title,
        text: post.fullText,
        photoUrl: fileUrl,
        description: post.text,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return dispatch({
      type: "FETCH_NEW_POST",
      payload: res.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const editPost = (post, file, id, fileCheck) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
  try {
    let fileUrl: string;
    if (fileCheck) {
      let fileRes = await axios.post(
        "http://localhost:5656/posts/upload",
        file,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      fileUrl = fileRes.data.url;
    }
    const res = await axios.patch(
      `http://localhost:5656/posts/${id}`,
      {
        title: post.title,
        text: post.description,
        photoUrl: fileUrl,
        description: post.text,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    dispatch(fetchPosts(1));
    return dispatch({
      type: "EDIT_POST",
      payload: res.data,
    });
  } catch (error) {
    alert(error);
  }
};

export const removePost = (id) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
  await axios.delete(`http://localhost:5656/posts/${id}`, {
    headers: {
      Authorization: token,
    },
  });

  await axios.get(`http://localhost:5656/comments/post/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return dispatch({
    type: "REMOVE_POST",
    payload: id,
  });
};

export const fetchComments = (postId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5656/comments/post/${postId}`
    );
    return dispatch({
      type: "FETCH_COMMENTS",
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};

export const addNewComments = (text, postId) => async (dispatch) => {
  const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
  try {
    const { data } = await axios.post(
      "http://localhost:5656/comments",
      {
        text,
        postId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return dispatch({
      type: "FETCH_NEW_COMMENTS",
      payload: data,
    });
  } catch (error) {
    alert(error);
  }
};
