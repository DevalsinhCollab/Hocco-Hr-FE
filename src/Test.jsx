import React, { useState } from "react";
import "./DynamicStamp.css";

const DynamicStamp = () => {
  const [stampContent, setStampContent] = useState("Initial Content");

  const updateStampContent = () => {
    const dynamicContent = "Updated Content";
    setStampContent(dynamicContent);
  };

  return (
    <div className="stamp-container">
      <div className="circle-stamp">
        <p className="stamp-text" data-text={stampContent}></p>
      </div>
      <div>
        <button onClick={updateStampContent}>Update Stamp</button>
      </div>
    </div>
  );
};

export default DynamicStamp;
