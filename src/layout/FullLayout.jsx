import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const FullLayout = ({ Component }) => {
  const [isNavbarClose, setIsNavbarClose] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarClose(!isNavbarClose);
  };

  return (
    <>
      <Sidebar isNavbarClose={isNavbarClose} />
      <section className="home-section">
        <Navbar toggleNavbar={toggleNavbar} />
        {Component}
      </section>
    </>
  );
};

export default FullLayout;
