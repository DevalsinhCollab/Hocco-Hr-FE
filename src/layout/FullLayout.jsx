import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

const FullLayout = ({ Component }) => {
  const [isNavbarClose, setIsNavbarClose] = useState(window.innerWidth <= 1024);

  const toggleNavbar = () => {
    setIsNavbarClose(!isNavbarClose);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsNavbarClose(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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