import * as React from "react";

import { Login, Register } from "../index";

type AuthModalProps = {
  showModal: string;
  handleCloseModal: Function;
};

export const AuthModal = ({ showModal, handleCloseModal }) => {
  return (
    <React.Fragment>
      {showModal === "signIn" ? (
        <Login handleCloseModal={handleCloseModal} />
      ) : showModal === "signUp" ? (
        <Register handleCloseModal={handleCloseModal} />
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
