import * as React from "react";
import "./EmptyArticle.scss";
// @ts-ignore
import empty from "../../../assets/img/Empty.svg";

export const EmptyArticle = () => {
  return (
    <div className="empty__article">
      <img src={empty} alt="" />
      <h1>Ничего не найдено...</h1>
    </div>
  );
};
