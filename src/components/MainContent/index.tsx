import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";

import {
  About,
  CreateArticle,
  EditArticle,
  FullArticle,
  Layout,
  Profile,
} from "../index";

import { setAuthFalse, setAuthTrue } from "../../store/actions/authUser";

import "./MainContent.scss";
import { Fragment, useState } from "react";
import { InitialStateAuth } from "../../types";

export const MainContent = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: InitialStateAuth) => state.authUser);
  const [showModal, setShowModal] = React.useState<
    "signIn" | "signUp" | null
  >();
  const [currentArticle, setCurrentArticle] = useState([]);
  const [currentPostId, setCurrentPostId] = React.useState("");
  const [showCreateArticle, setShowCreateArticle] = React.useState(false);

  React.useEffect(() => {
    // @ts-ignore
    const { token } = JSON.parse(localStorage.getItem("userInfo")) || [];
    if (token && token) {
      axios
        .get("/auth/me", {
          headers: {
            Authorization: token,
          },
        })
        .then((res: AxiosResponse) => dispatch(setAuthTrue()))
        .catch((reason: AxiosError) => dispatch(setAuthFalse()));
    }
  }, []);

  const handleCloseModal = (): void => {
    setShowModal(null);
  };

  const createArticle = (): void => {
    setShowCreateArticle(true);
  };

  const editArticle = (current: any): void => {
    setCurrentArticle(current);
  };

  const cancelArticle = (): void => {
    setShowCreateArticle(false);
  };

  const showCurrentPost = (id: string): void => {
    setCurrentPostId(id);
  };

  const handleClickOpenSignIn = (): void => {
    setShowModal("signIn");
  };

  const handleClickOpenSignUp = (): void => {
    setShowModal("signUp");
  };

  return (
    <div className="container">
      <div className="row">
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                editArticle={editArticle}
                showModal={showModal}
                createArticle={createArticle}
                showCurrentPost={showCurrentPost}
                handleClickOpenSignIn={handleClickOpenSignIn}
                handleClickOpenSignUp={handleClickOpenSignUp}
                handleCloseModal={handleCloseModal}
              />
            }
          >
            <Route index element={<About />} />
            {isAuth && (
              <Fragment>
                <Route path="/profile" element={<Profile />} />
                <Route
                  path="/create-article"
                  element={<CreateArticle cancelArticle={cancelArticle} />}
                />
                <Route
                  path="/edit-article/:id"
                  element={<EditArticle currentArticle={currentArticle} />}
                />
              </Fragment>
            )}

            <Route path="/post/:id" element={<FullArticle />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};
