// @ts-ignore
import Avatar from "../../assets/img/avatar.svg";

import "./About.scss";

export const About = () => {
  return (
    <div className="row__about">
      <div className="info">
        <h1>VASA PUMPKIN</h1>
        <p>Блог фронтенд-разработчика</p>
        <img src={Avatar} alt="avatar" />
      </div>
      <div className="about">
        <h3>Обо мне</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          assumenda expedita harum minus molestias natus nesciunt officia, vero
          vitae voluptates. Ad architecto assumenda iste obcaecati placeat
          repudiandae tenetur veritatis vitae.
        </p>
      </div>
    </div>
  );
};
