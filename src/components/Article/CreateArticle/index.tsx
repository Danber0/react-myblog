import * as React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { addNewPost, fetchPosts } from "../../../store/actions/postUser";

import { SimpleMdeReact } from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import "./CreateArticle.scss";
import { checkValueObj } from "../../../config";

type InputValue = {
  [keyof: string]: string;
};

type CreateArticleProps = {
  cancelArticle: () => void;
};

export const CreateArticle: React.FC<CreateArticleProps> = ({
  cancelArticle,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState<InputValue>({
    title: "",
    text: "",
    file: "",
    fullText: "",
  });

  const handleAddPost = async () => {
    const file = inputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    if (checkValueObj(inputValue)) {
      navigate("/");
      await dispatch(addNewPost(inputValue, formData));
      dispatch(fetchPosts(1));
    } else {
      alert("В каждом поле должно быть не менее 4 символов!");
    }
  };

  const handleChangeInputValue = (event) => {
    if (typeof event === "object") {
      if (event.target.files) {
        setInputValue({ ...inputValue, file: event.target.files[0].name });
      } else if (event.target) {
        setInputValue({
          ...inputValue,
          [event.target.name]: event.target.value,
        });
      }
    } else {
      setInputValue({ ...inputValue, fullText: event });
    }
  };

  return (
    <div className="article">
      <div className="article__create">
        <div className="article__title">
          <input
            maxLength={30}
            type="text"
            placeholder="Введите заголовок"
            name="title"
            value={inputValue.title}
            onChange={handleChangeInputValue}
          />
        </div>
        <div className="article__short-description">
          <p className="article__text">Введите короткое описание</p>
          <input
            maxLength={60}
            type="text"
            name="text"
            value={inputValue.text}
            onChange={handleChangeInputValue}
          />
        </div>
        <div className="article__image">
          <p className="article__text">Загрузите файл</p>
          <div className="article__block-url">
            <input
              ref={inputRef}
              type="file"
              id="file"
              onChange={handleChangeInputValue}
            />
            <input
              type="text"
              disabled
              name="file"
              value={inputValue.file}
              onChange={handleChangeInputValue}
            />
            <label htmlFor="file">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 11.6667V15.2223C17 15.6938 16.8127 16.146 16.4793 16.4794C16.1459 16.8128 15.6937 17.0001 15.2222 17.0001H2.77778C2.30628 17.0001 1.8541 16.8128 1.5207 16.4794C1.1873 16.146 1 15.6938 1 15.2223V11.6667"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13.4446 5.44444L9.00011 1L4.55566 5.44444"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 1V11.6667"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Загрузить</span>
            </label>
          </div>
        </div>
        <div className="article__full-description">
          <p className="article__text">Полное описание</p>
          <SimpleMdeReact
            value={inputValue.fullText}
            onChange={handleChangeInputValue}
          />
        </div>
        <div className="article__submit">
          <Link
            to="/"
            onClick={cancelArticle}
            className="article__submit-cancel"
          >
            Отмена
          </Link>
          <button onClick={handleAddPost} className="article__submit-form">
            Опубликовать
          </button>
        </div>
      </div>
    </div>
  );
};
