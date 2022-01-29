import { Fragment, useEffect, useState } from "react";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Comments } from "./Comments";

import "./FullArticle.scss";

import { stringToDate } from "../../../config";

import { InitialStateAuth, InitialStatePost } from "../../../types";
import { addNewComments, fetchComments } from "../../../store/actions/postUser";

export const FullArticle = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [commentValue, setCommentValue] = useState("");
  const { isAuth } = useSelector((state: InitialStateAuth) => state.authUser);
  const { currentPost } = useSelector(
    (state: InitialStatePost) => state.postUser.post
  );

  useEffect(() => {
    dispatch(fetchComments(params.id));
  }, [params.id]);

  const addNewComment = () => {
    if (commentValue.trim()) {
      dispatch(addNewComments(commentValue, params.id));
    } else {
      alert("Напиши комментарий!");
    }
    setCommentValue("");
  };

  return (
    <div className="article__full">
      {currentPost.map((user: any) => (
        <Fragment key={user._id}>
          <div className="article__full-top">
            <img
              src={`/${user.photoUrl || "/uploads/no-image.png"}`}
              alt="img"
            />
            <div className="article__full-top-inside">
              <div className="article__full-date">
                <p>{stringToDate(user.createdAt)}</p>
                <span>
                  <svg
                    width="17"
                    height="12"
                    viewBox="0 0 17 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5 0C4.63636 0 1.33682 2.488 0 6C1.33682 9.512 4.63636 12 8.5 12C12.3636 12 15.6632 9.512 17 6C15.6632 2.488 12.3636 0 8.5 0ZM8.5 10C6.36727 10 4.63636 8.208 4.63636 6C4.63636 3.792 6.36727 2 8.5 2C10.6327 2 12.3636 3.792 12.3636 6C12.3636 8.208 10.6327 10 8.5 10ZM8.5 3.6C7.21727 3.6 6.18182 4.672 6.18182 6C6.18182 7.328 7.21727 8.4 8.5 8.4C9.78273 8.4 10.8182 7.328 10.8182 6C10.8182 4.672 9.78273 3.6 8.5 3.6Z"
                      fill="#E2E2E2"
                    />
                  </svg>
                  {user.views}
                </span>
              </div>
              <div className="article__full-title">
                <h2>{user.title}</h2>
                <p>{user.description}</p>
              </div>
            </div>
          </div>
          <div className="article__full-text">
            <p>{user.text}</p>
          </div>
        </Fragment>
      ))}
      <div className="article__full-comments">
        <Comments />
      </div>
      <div className="article__full-add">
        <h6>Добавить комментарий</h6>
        <input
          disabled={!isAuth}
          type="text"
          value={commentValue}
          onChange={(event) => setCommentValue(event.target.value)}
        />
        <button disabled={!isAuth} onClick={addNewComment}>
          Отправить
        </button>
      </div>
    </div>
  );
};
