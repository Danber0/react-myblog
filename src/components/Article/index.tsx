import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ContentLoaded, EmptyArticle, Header } from "../index";
import {
  currentPost,
  fetchPosts,
  removePost,
} from "../../store/actions/postUser";
import { stringToDate } from "../../config";
import { InitialStateAuth, InitialStatePost } from "../../types";
import "./Article.scss";

type ArticleProps = {
  createArticle: () => void;
  showCurrentPost: (id: string) => void;
  editArticle: (current) => void;
};

export const Article: React.FC<ArticleProps> = ({
  createArticle,
  showCurrentPost,
  editArticle,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [pages, setPages] = useState(1);
  const { isAuth } = useSelector((state: InitialStateAuth) => state.authUser);
  const { post, isLoading } = useSelector(
    (state: InitialStatePost) => state.postUser
  );

  useEffect(() => {
    dispatch(fetchPosts(pages));
    dispatch(currentPost(params.id ? params.id : ""));
  }, [pages]);

  const handleIdPost = (id) => {
    dispatch(currentPost(id));
    showCurrentPost(id);
  };

  const handleRemoveArticle = async (id) => {
    if (window.confirm("Ты точно хочешь удалить статью?")) {
      await dispatch(removePost(id));
      navigate("/");
      dispatch(fetchPosts(pages));
    }
  };

  const togglePagesLeft = () => {
    if (pages === 1) {
      return;
    }
    setPages((prev) => prev - 1);
  };

  const togglePagesRight = () => {
    if (pages === Math.ceil(post.total / 3)) {
      return;
    }
    setPages((prev) => prev + 1);
  };

  const handleEditArticle = (id: string) => {
    const currentEditArticle = post.items.filter(
      (curr: any) => curr._id === id
    );
    editArticle(currentEditArticle);
  };

  return (
    <div className="row__article">
      <Header createArticle={createArticle} />
      {!post.items.length ? (
        <EmptyArticle />
      ) : (
        <Fragment>
          {!isLoading ? (
            <Fragment>
              {post.items &&
                post.items.map((post: any) => (
                  <Fragment key={post._id}>
                    <Link to={`/post/${post._id}`}>
                      <div
                        className="article__comments"
                        onClick={() => handleIdPost(post._id)}
                      >
                        <div className="article__description">
                          <h4>{post.title}</h4>
                          <p>{post.description}</p>
                          <div className="article__info">
                            <span className="article__date">
                              {stringToDate(post.createdAt)}
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
                              <span>{post.views}</span>
                            </span>
                          </div>
                        </div>
                        <div className="article__image">
                          <img
                            src={`${post.photoUrl || "/uploads/no-image.png"}`}
                            alt="img"
                          />
                        </div>
                      </div>
                    </Link>
                    {isAuth && (
                      <div className="article__buttons">
                        <div className="article__remove">
                          <button
                            className="article__button"
                            onClick={() => handleRemoveArticle(post._id)}
                          >
                            Удалить
                          </button>
                        </div>
                        <Link to={`/edit-article/${post._id}`}>
                          <div className="article__edit">
                            <button
                              className="article__button"
                              onClick={() => handleEditArticle(post._id)}
                            >
                              Редактировать
                            </button>
                          </div>
                        </Link>
                      </div>
                    )}
                  </Fragment>
                ))}
              <div className="pagination">
                <div className="pagination__arrow">
                  <span
                    onClick={togglePagesLeft}
                    className="pagination__left style"
                  >
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.4992 8.68607C19.4992 9.00102 19.3741 9.30306 19.1514 9.52576C18.9287 9.74846 18.6266 9.87357 18.3117 9.87357L4.55332 9.87357L9.65244 14.9703C9.76285 15.0807 9.85043 15.2118 9.91018 15.3561C9.96994 15.5003 10.0007 15.6549 10.0007 15.8111C10.0007 15.9672 9.96994 16.1218 9.91018 16.2661C9.85043 16.4103 9.76285 16.5414 9.65244 16.6518C9.54203 16.7622 9.41096 16.8498 9.2667 16.9096C9.12245 16.9693 8.96783 17.0001 8.81169 17.0001C8.65555 17.0001 8.50094 16.9693 8.35668 16.9096C8.21242 16.8498 8.08135 16.7622 7.97094 16.6518L0.845941 9.52682C0.735354 9.41651 0.647614 9.28547 0.587749 9.1412C0.527884 8.99693 0.497069 8.84227 0.497069 8.68607C0.497069 8.52987 0.527884 8.37521 0.587749 8.23094C0.647614 8.08667 0.735354 7.95563 0.845942 7.84532L7.97094 0.720322C8.19392 0.497341 8.49635 0.372072 8.81169 0.372072C9.12704 0.372072 9.42946 0.497341 9.65244 0.720322C9.87542 0.943303 10.0007 1.24573 10.0007 1.56107C10.0007 1.87641 9.87542 2.17884 9.65244 2.40182L4.55332 7.49857L18.3117 7.49857C18.6266 7.49857 18.9287 7.62368 19.1514 7.84638C19.3741 8.06908 19.4992 8.37113 19.4992 8.68607Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={togglePagesRight}
                    className="pagination__right style"
                  >
                    <svg
                      width="20"
                      height="17"
                      viewBox="0 0 20 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M19.4992 8.68607C19.4992 9.00102 19.3741 9.30306 19.1514 9.52576C18.9287 9.74846 18.6266 9.87357 18.3117 9.87357L4.55332 9.87357L9.65244 14.9703C9.76285 15.0807 9.85043 15.2118 9.91018 15.3561C9.96994 15.5003 10.0007 15.6549 10.0007 15.8111C10.0007 15.9672 9.96994 16.1218 9.91018 16.2661C9.85043 16.4103 9.76285 16.5414 9.65244 16.6518C9.54203 16.7622 9.41096 16.8498 9.2667 16.9096C9.12245 16.9693 8.96783 17.0001 8.81169 17.0001C8.65555 17.0001 8.50094 16.9693 8.35668 16.9096C8.21242 16.8498 8.08135 16.7622 7.97094 16.6518L0.845941 9.52682C0.735354 9.41651 0.647614 9.28547 0.587749 9.1412C0.527884 8.99693 0.497069 8.84227 0.497069 8.68607C0.497069 8.52987 0.527884 8.37521 0.587749 8.23094C0.647614 8.08667 0.735354 7.95563 0.845942 7.84532L7.97094 0.720322C8.19392 0.497341 8.49635 0.372072 8.81169 0.372072C9.12704 0.372072 9.42946 0.497341 9.65244 0.720322C9.87542 0.943303 10.0007 1.24573 10.0007 1.56107C10.0007 1.87641 9.87542 2.17884 9.65244 2.40182L4.55332 7.49857L18.3117 7.49857C18.6266 7.49857 18.9287 7.62368 19.1514 7.84638C19.3741 8.06908 19.4992 8.37113 19.4992 8.68607Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </div>
                <p>
                  Страница {pages} из {Math.ceil(post.total / 3) || 1}
                </p>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              {post.items.map((_, index) => (
                <ContentLoaded key={index} />
              ))}
            </Fragment>
          )}
        </Fragment>
      )}
    </div>
  );
};
