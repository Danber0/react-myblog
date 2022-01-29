const InitialStatePost = {
  isLoading: false,
  post: {
    currentPost: [],
    total: 0,
    items: [],
  },
  comments: [],
};

export const postUser = (state = InitialStatePost, action) => {
  switch (action.type) {
    case "SET_IS_LOAD_TRUE":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_IS_LOAD_FALSE":
      return {
        ...state,
        isLoading: false,
      };
    case "FIND_POSTS":
      return {
        ...state,
        post: {
          ...action.payload,
          currentPost: state.post.currentPost,
        },
      };
    case "FETCH_POSTS":
      return {
        ...state,
        post: {
          ...action.payload,
          currentPost: state.post.currentPost,
        },
      };
    case "CURRENT_POSTS":
      return {
        ...state,
        post: {
          ...state.post,
          currentPost: [action.payload],
        },
      };
    case "FETCH_NEW_POST":
      return {
        post: {
          ...state.post,
          total: state.post.total + 1,
          items: [...state.post.items, action.payload],
        },
      };
    case "EDIT_POST":
      return {
        ...state,
      };
    case "REMOVE_POST":
      const removePost = state.post.items.filter(
        (elem) => elem._id !== action.payload
      );
      return {
        ...state,
        post: {
          ...state.post,
          total: state.post.total - 1,
          items: removePost,
        },
      };
    case "FETCH_COMMENTS":
      return {
        ...state,
        comments: action.payload,
      };
    case "FETCH_NEW_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    default:
      return state;
  }
};
