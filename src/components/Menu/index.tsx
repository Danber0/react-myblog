import * as React from "react";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { setAuthFalse } from "../../store/actions/authUser";
import { stringToDate } from "../../config/";
import { InitialStateAuth, IUserInfo } from "../../types";

import "./Menu.scss";
import { Link } from "react-router-dom";

export const Menu = ({
  handleClickOpenSignIn,
  handleClickOpenSignUp,
  createArticle,
}) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: InitialStateAuth) => state.authUser);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    comments: [],
    createdAt: "",
    email: "",
    fullName: "",
    post: [],
    updatedAt: "",
    __v: 0,
    _id: "",
  });

  const toggleMenu: React.MouseEventHandler<HTMLDivElement> = () => {
    setOpenMenu(!openMenu);
  };

  const handleClickExit = () => {
    localStorage.clear();
    dispatch(setAuthFalse());
  };

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem("userInfo")) || [];
    (async () => {
      if (isAuth) {
        try {
          const res = await axios.get(`http://localhost:5656/users/${id}`);
          const result = res.data;
          setUserInfo(result);
        } catch (error) {}
      } else {
        setUserInfo({
          comments: [],
          createdAt: null,
          email: "",
          fullName: "",
          post: [],
          updatedAt: null,
          __v: 0,
          _id: "",
        });
      }
    })();
  }, [isAuth]);

  return (
    <div className={`right__menu ${openMenu ? "active" : ""}`}>
      <div className="menu">
        <div className="menu__stick" onClick={toggleMenu}>
          <h5>МЕНЮ</h5>
          <div className="stick">
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div className="menu__active">
        <div className="menu__content">
          <div className="menu__info">
            <h5>{userInfo.fullName}</h5>
            <p>
              {userInfo.createdAt
                ? `Дата регистрации: ${stringToDate(userInfo.createdAt)}`
                : ""}
            </p>
          </div>
          <div className="menu__list">
            <ul>
              <Link to="/">
                <li>Главная</li>
              </Link>
              {isAuth && (
                <Link to="/profile">
                  <li>Мой профиль</li>
                </Link>
              )}
              {isAuth && (
                <Link to="/create-article">
                  <li onClick={createArticle}>Создать запись</li>
                </Link>
              )}
              {isAuth ? (
                <li onClick={handleClickExit}>Выйти</li>
              ) : (
                <Fragment>
                  <li onClick={handleClickOpenSignIn}>Войти</li>
                  <li onClick={handleClickOpenSignUp}>Регистрация</li>
                </Fragment>
              )}
            </ul>
          </div>
        </div>
        <div className="menu__title" onClick={toggleMenu}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="1.63599"
              y="0.221817"
              width="20"
              height="2"
              transform="rotate(45 1.63599 0.221817)"
              fill="white"
            />
            <rect
              x="15.5564"
              y="1.63603"
              width="20"
              height="2"
              transform="rotate(135 15.5564 1.63603)"
              fill="white"
            />
          </svg>
          <h5>МЕНЮ</h5>
        </div>
      </div>
    </div>
  );
};
