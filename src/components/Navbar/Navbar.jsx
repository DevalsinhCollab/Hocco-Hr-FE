import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { titleArray } from "../../utils/utils";
import LanguageIcon from "../../../public/Images/language.png"

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

  // useEffect(() => {
  //   let mainTitle = titleArray.find((item) => location.pathname.includes(item.link)).title
  //   setTitle(mainTitle)
  // }, [location])

  return (
    <nav>
      <div className="sidebar-button" onClick={toggleNavbar}>
        <i className="bx bx-menu sidebarBtn"></i>
        {/* <span className="dashboard">{t(title)}</span> */}
      </div>

      <Dropdown className="d-flex align-items-center gap-3">
        <Dropdown>
          <Dropdown.Toggle
            style={{
              backgroundColor: "#f1f1f1",
              border: "2px solid #efeef1",
              borderRadius: "9999px",
            }}
          >
            <img src={LanguageIcon}  />

            <span className="text-dark" style={{marginLeft: "0.3rem"}}>
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
            style={{borderRadius: "999pc"}}
          />
          <span className="admin_name">{auth && auth.name}</span>
          <i className="bx bx-chevron-down"></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#" onClick={_handleLogoutBtn}>Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </nav>
  );
};

export default Navbar;
