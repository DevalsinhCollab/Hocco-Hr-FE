import React from "react";
import { Link } from "react-router-dom";

const DashCard = (props) => {
  const { title, count, icon, subtitle, link = "", index } = props;

  return (
    <Link to={link} className="text-decoration-none text-dark" key={index}>
      <div className="box">
        <i className={icon}></i>
        <div className="right-side">
          <div className="box-topic">{title}</div>
          <div className="number">{count?.toLocaleString("en-US")}</div>
          <div className="indicator">
            <span className="text">{subtitle}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DashCard;
