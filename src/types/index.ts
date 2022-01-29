export interface InitialStateAuth {
  authUser: {
    isAuth: boolean;
  };
}

export interface InitialStatePost {
  postUser: {
    isLoading: boolean;
    post: {
      currentPost: [];
      total: number;
      items: [];
    };
    comments: [];
  };
}

export interface IUserInfo {
  comments: [];
  createdAt: string;
  email: string;
  fullName: string;
  post: [];
  updatedAt: string;
  __v: number;
  _id: string;
}
