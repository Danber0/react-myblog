import * as React from "react";
import { Fragment } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

import { AuthModal, Menu, Article } from "../index";

type LayoutProps = {
  showModal: boolean;
  createArticle: () => void;
  showCurrentPost: () => void;
  handleClickOpenSignIn: () => void;
  handleClickOpenSignUp: () => void;
  handleCloseModal: () => void;
  editArticle: () => void;
};

export const Layout = ({
  editArticle,
  showModal,
  createArticle,
  showCurrentPost,
  handleClickOpenSignIn,
  handleClickOpenSignUp,
  handleCloseModal,
}) => {
  const location = useLocation();

  return (
    <Fragment>
      <Outlet />
      {location.pathname !== "/profile" && (
        <Article
          editArticle={editArticle}
          createArticle={createArticle}
          showCurrentPost={showCurrentPost}
        />
      )}

      <Menu
        handleClickOpenSignIn={handleClickOpenSignIn}
        handleClickOpenSignUp={handleClickOpenSignUp}
        createArticle={createArticle}
      />
      <AuthModal showModal={showModal} handleCloseModal={handleCloseModal} />
    </Fragment>
  );
};
