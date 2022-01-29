// @ts-ignore
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setAuthTrue, setUserId } from "../../store/actions/authUser";

import "./AuthModal.scss";

type Form = {
  [keyof: string]: string;
};

export const Login: React.FC = ({ handleCloseModal }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<Form>({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email: inputValue.email,
        password: inputValue.password,
      });
      const token = await res.data.token;
      const id = await res.data._id;
      localStorage.setItem("userInfo", JSON.stringify({ token, id }));
      setInputValue({ email: "", password: "" });
      dispatch(setAuthTrue());
      dispatch(setUserId(res.data._id));
      alert("Успешная авторизация!");
      handleCloseModal();
    } catch (error) {
      alert("Не удалось авторизироваться!");
    }
  };

  const handleChangeInput = (event) => {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  };

  return (
    <div className="popup">
      <div className="popup__window">
        <div className="popup__close" onClick={handleCloseModal}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.87818 7.99886L15.606 2.28357C15.8568 2.03271 15.9977 1.69246 15.9977 1.33769C15.9977 0.98291 15.8568 0.642664 15.606 0.391799C15.3552 0.140934 15.015 0 14.6602 0C14.3055 0 13.9653 0.140934 13.7145 0.391799L8 6.12041L2.28552 0.391799C2.03469 0.140934 1.6945 -2.64329e-09 1.33977 0C0.985044 2.64329e-09 0.644846 0.140934 0.394017 0.391799C0.143188 0.642664 0.00227327 0.98291 0.00227327 1.33769C0.00227327 1.69246 0.143188 2.03271 0.394017 2.28357L6.12182 7.99886L0.394017 13.7142C0.269166 13.838 0.17007 13.9853 0.102444 14.1477C0.0348177 14.31 0 14.4842 0 14.66C0 14.8359 0.0348177 15.01 0.102444 15.1724C0.17007 15.3347 0.269166 15.4821 0.394017 15.6059C0.517848 15.7308 0.665174 15.8299 0.827496 15.8975C0.989818 15.9652 1.16392 16 1.33977 16C1.51562 16 1.68972 15.9652 1.85204 15.8975C2.01437 15.8299 2.16169 15.7308 2.28552 15.6059L8 9.87731L13.7145 15.6059C13.8383 15.7308 13.9856 15.8299 14.148 15.8975C14.3103 15.9652 14.4844 16 14.6602 16C14.8361 16 15.0102 15.9652 15.1725 15.8975C15.3348 15.8299 15.4822 15.7308 15.606 15.6059C15.7308 15.4821 15.8299 15.3347 15.8976 15.1724C15.9652 15.01 16 14.8359 16 14.66C16 14.4842 15.9652 14.31 15.8976 14.1477C15.8299 13.9853 15.7308 13.838 15.606 13.7142L9.87818 7.99886Z"
              fill="#D7D7D7"
            />
          </svg>
        </div>
        <div className="popup__content">
          <div className="popup__title">
            <h1>Вход в аккаунт</h1>
          </div>
          <div className="popup__fields">
            <form onSubmit={handleSubmit}>
              <p className="popup__info">Почта</p>
              <input
                value={inputValue.email}
                onChange={handleChangeInput}
                type="email"
                placeholder="Введите Почту"
                name="email"
              />
              <p className="popup__info">Пароль</p>
              <input
                value={inputValue.password}
                onChange={handleChangeInput}
                type="text"
                placeholder="Введите Пароль"
                name="password"
              />
              <button className="popup__button">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
