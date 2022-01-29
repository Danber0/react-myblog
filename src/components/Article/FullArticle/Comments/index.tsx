import * as React from "react";
import { useSelector } from "react-redux";

import { stringToDate } from "../../../../config";

import { InitialStatePost } from "../../../../types";

import "./Comments.scss";

export const Comments: React.FC = () => {
  const { comments } = useSelector((state: InitialStatePost) => state.postUser);

  return (
    <div className="comment">
      <h6>Комментарии ({comments ? comments.length : 0})</h6>
      {comments &&
        comments.map((comment: any) => (
          <div className="comment__user" key={comment.createdAt}>
            <div className="comment__title">
              <h3>{comment.user.fullName}</h3>
              <span>{stringToDate(comment.createdAt)}</span>
            </div>
            <div className="comment__text">
              <p>{comment.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};
