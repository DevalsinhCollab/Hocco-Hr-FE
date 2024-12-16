import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TranslateIcon from "@mui/icons-material/Translate";
import { titleArray } from "../../utils/utils";

const Navbar = (props) => {
  const { toggleNavbar } = props;
  const navigate = useNavigate();
  const location = useLocation()

  const { auth } = useSelector((state) => state.authData);
  const { t, i18n } = useTranslation();

  const [imageSrc, setImageSrc] = useState(null);
  const [title, setTitle] = useState("")

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
    let mainTitle = titleArray.find((item) => item.link == location.pathname).title
    setTitle(mainTitle)
  }, [location])

  return (
    <nav>
      <div className="sidebar-button" onClick={toggleNavbar}>
        <i className="bx bx-menu sidebarBtn"></i>
        <span className="dashboard">{t(title)}</span>
      </div>

      <Dropdown className="d-flex align-items-center gap-3">
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "white",
              border: "2px solid #efeef1",
              borderRadius: "6px",
            }}
          >
            <TranslateIcon style={{ color: "black" }} />
            <i className="bx bx-chevron-down"></i>
            <span className="text-dark ">
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
          className="profile-details d-flex justify-content-between"
        >
          <img
            src={imageSrc !== null ? imageSrc : "./Images/user.jpg"}
            alt="User"
          />
          <span className="admin_name">{auth && auth.name}</span>
          <i className="bx bx-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#">
            <Link
              to={"/setprofile"}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div>Profile</div>
            </Link>
          </Dropdown.Item>
          <Dropdown.Item href="#" onClick={_handleLogoutBtn}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
