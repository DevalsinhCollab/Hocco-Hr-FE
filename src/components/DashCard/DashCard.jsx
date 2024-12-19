import React from "react";
import { Link } from "react-router-dom";

const DashCard = (props) => {
  const { title, count, icon, link = "", index, borderColor } = props;

  return (
    <Link to={link} className="text-decoration-none text-dark" key={index}>
      <div 
        className="box"
        style={{
            border: `.13rem solid ${borderColor}`,
          }}
      >
        <img
          src={icon}
          style={{
            borderRadius: "5px",
            border: `.13rem solid ${borderColor}`,
            padding: "0.9rem",
            width: "57px",
            height: "57px",
          }}
        />

        <div className="middleDiv">
          <div className="box-topic">{title}</div>
          <div className="number">{count?.toLocaleString("en-US")}</div>
        </div>
      </div>
    </Link>
  );
};

export default DashCard;
