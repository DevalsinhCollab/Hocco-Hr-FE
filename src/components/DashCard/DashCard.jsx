import React from "react";
import { Link } from "react-router-dom";

const DashCard = (props) => {
  const { title, count, icon, link = "", index, borderColor } = props;

  return (
    <Link to={link} className="text-decoration-none text-dark" key={index}>
      <div className="box">
        <img
          src={icon}
          style={{
            marginBottom: "1rem",
            borderRadius: "8px",
            border: `3px solid ${borderColor}`,
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
