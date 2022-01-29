import * as React from "react";
import { Fragment, useEffect, useState } from "react";

import "./Profile.scss";
import axios from "axios";
import { stringToDate } from "../../config";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [toggleInfo, setToggleInfo] = useState<"posts" | "comments">("posts");
  const [userInfo, setUserInfo] = useState<any>([]);

  useEffect(() => {
    const { token, id } = JSON.parse(localStorage.getItem("userInfo")) || [];
    axios
      .get(`http://localhost:5656/users/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(({ data }) => setUserInfo(data));
  }, [toggleInfo]);

  console.log(userInfo);

  return (
    <div className="user">
      <div className="user__info">
        <h5>{userInfo && userInfo.fullName}</h5>
        <p>{userInfo && stringToDate(userInfo.createdAt)}</p>
      </div>
      <div className="user__activity">
        <button
          className={`user__post ${toggleInfo === "posts" ? "active" : ""}`}
          onClick={() => setToggleInfo("posts")}
        >
          Статьи
        </button>
        <button
          className={`user__post ${toggleInfo === "comments" ? "active" : ""}`}
          onClick={() => setToggleInfo("comments")}
        >
          Комментарии
        </button>
      </div>
      <div className="user__all-info">
        {toggleInfo === "posts" ? (
          <Fragment>
            {userInfo.posts &&
              userInfo.posts.map((info) => (
                <div className="article__comments" key={info._id}>
                  <div className="article__description">
                    <h4>{info.title}</h4>
                    <p>{info.text}</p>
                    <div className="article__info">
                      <span className="article__date">
                        {stringToDate(info.createdAt)}
                      </span>
                      <span className="article__views">
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
                        <span>{info.views}</span>
                      </span>
                    </div>
                  </div>
                  <div className="article__image">
                    <img
                      src={`http://localhost:5656/${info.photoUrl}`}
                      alt="img"
                    />
                  </div>
                </div>
              ))}
          </Fragment>
        ) : (
          <div className="profile__comment">
            {userInfo.comments &&
              userInfo.comments.map((comment: any) => (
                <div className="profile__comment-user" key={comment.createdAt}>
                  <div className="profile__comment-title">
                    <h3>{comment.fullName}</h3>
                    <span>{stringToDate(comment.createdAt)}</span>
                  </div>
                  <div className="profile__comment-text">
                    <p>{comment.text}</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
