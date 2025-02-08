import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { titleArray } from "../../utils/utils";
import LanguageIcon from "../../../public/Images/language.png"
import { Button } from "@mui/material";
import SwitchCompany from "../Modal/SwitchCompany";
import SidebarLogo from "../../../public/Images/Sidebar.png"

const Navbar = (props) => {
  const { toggleNavbar } = props;
  const navigate = useNavigate();
  const location = useLocation()

  const { auth } = useSelector((state) => state.authData);
  const { t, i18n } = useTranslation();

  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState("")
  const [open, setOpen] = useState("")
  const [currentApp, setCurrentApp] = useState("")

  useEffect(() => {
    if (auth?.empImgBase64) {
      setImageSrc(auth.empImgBase64);
    }
  }, [auth]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const _handleLogoutBtn = () => {
    localStorage.removeItem("authUser")
    localStorage.removeItem("companyId")
    navigate("/login");
  };

  useEffect(() => {
    let mainTitle = titleArray && titleArray.find((item) => location.pathname.includes(item.link)) && titleArray.find((item) => location.pathname.includes(item.link)).title
    setTitle(mainTitle)
  }, [location])

  return (
    <nav style={{ background: "#cf1042", color: "#fff" }}>
      <div className="sidebar-button" onClick={toggleNavbar}>
        <img src={SidebarLogo} style={{ marginRight: "1rem", cursor: "pointer" }} />
        <span className="dashboard">{title && title !== "" ? t(title) : ""}</span>
      </div>

      <Dropdown className="d-flex align-items-center gap-3">
        {auth && auth.isSuperAdmin &&
          // <Button onClick={() => setOpen(true)} sx={{ color: "#fff", background: "#2c2b7e" }}>{t("Switch Company")}</Button>
          <Button onClick={() => setOpen(true)} sx={{ color: "#fff", background: "#2c2b7e" }}>{currentApp && currentApp.label}</Button>
        }

        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #1c1b6c",
              borderRadius: "9999px",
            }}
          >
            <img src={LanguageIcon} />

            <span className="text-dark" style={{ marginLeft: "0.3rem" }}>
              {localStorage.getItem("language")
                ? localStorage.getItem("language").toUpperCase()
                : "EN"}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => changeLanguage("en")}>
              <Link style={{ textDecoration: "none", color: "black" }}>
                <div>English</div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("hi")}>
              Hindi
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("gu")}>
              Gujarati
            </Dropdown.Item>
            <Dropdown.Item onClick={() => changeLanguage("ma")}>
              Marathi
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown.Toggle
          id="dropdown-basic"
          className="profile-details"
        >
          <img
            src={imageSrc !== null ? imageSrc : "./Images/user.jpg"}
            alt="User"
            style={{ borderRadius: "999pc" }}
          />
          <span className="admin_name">{auth && auth.name}</span>
          {/* <i className="bx bx-chevron-down"></i> */}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={_handleLogoutBtn}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <SwitchCompany open={open} setOpen={setOpen} setCurrentApp={setCurrentApp} />
    </nav>
  );
};

export default Navbar;
