import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { sideBarArray } from "../../utils/SideBarArray";
import { Collapse, List, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { getCompanies } from "../../features/CompanyDetailSlice";
import { updateUser } from "../../features/authDetailsSlice";
import { getDashboardCount } from "../../features/dashboardSlice";
import Logo from "../../../public/Images/logo.png";

const Sidebar = (props) => {
  const { isNavbarClose } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();

  console.log(location, "location======");
  

  const { auth } = useSelector((state) => state.authData);
  const { companies } = useSelector((state) => state.companyData);

  const [activeMenu, setActiveMenu] = useState(null);
  const [open, setOpen] = useState(false);

  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredSubIndex, setHoveredSubIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleSubMouseEnter = (index) => {
    setHoveredSubIndex(index);
  };

  const handleSubMouseLeave = () => {
    setHoveredSubIndex(null);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const _handleLogoutBtn = () => {
    localStorage.removeItem("authUser");
    localStorage.removeItem("companyId");
    navigate("/login");
  };

  const handleParentClick = (index) => {
    setActiveMenu((prevActiveMenu) => (prevActiveMenu === index ? null : index));
  };

  useEffect(() => {
    dispatch(getCompanies());
  }, []);

  const handleGetCompany = (data) => {
    localStorage.setItem("companyId", data._id);
    dispatch(updateUser({ id: auth._id, company: data._id }));
    dispatch(getDashboardCount());
    navigate("/");
    setOpen(!open);
  };

  let filteredSideBarArray = sideBarArray.filter((item) =>
    item.role.includes(auth && auth.userType !== undefined && auth.userType)
  );

  return (
    <div className={`sidebar ${isNavbarClose ? "sidebar-close" : ""}`}>
      <div className="logo-details">
        <span className="logo_name">
          <img src={Logo} alt="Logo" />
        </span>
      </div>

      {auth && auth.userType && ["HR", "AHR"].includes(auth.userType) &&
        <List
          sx={{ width: "100%", maxWidth: 360, color: "#fff" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <ListItemButton onClick={handleClick} sx={{ bgcolor: "#d51245" }} className="company">
            <ListItemText primary="Companies" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {companies &&
              companies.map((item, index) => (
                <List component="div" disablePadding onClick={() => handleGetCompany(item)} key={index} >
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={item.name} style={{ color: "black" }} className="companyList" />
                  </ListItemButton>
                </List>
              ))}
          </Collapse>
        </List>
      }

      <ul className="nav-links ps-0">
        {filteredSideBarArray.map((item, index) => (
          <li key={index} style={{ padding: isNavbarClose ? "0px 10px" : "0px 15px" }}>
            <Link
              to={item.link}
              key={index}
              className={item.activeLink.includes(location.pathname) ? "active" : ""}
              onClick={item.submenu ? () => handleParentClick(index) : undefined}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              style={{ margin: "5px 0px", display: "flex", padding: "0px 20px" }}
            >
              <img src={item.activeLink.includes(location.pathname) || hoveredIndex == index ? item.activeIcon : item.icon} style={{ marginRight: "1rem" }} />

              {!isNavbarClose &&
                <span
                  className="links_name"
                  style={{
                    color: item.activeLink.includes(location.pathname) || hoveredIndex == index ? "#d61346" : "black",
                  }}
                >
                  {t(item.title)}

                  {item && item.submenu && activeMenu == index ? <ExpandLess sx={{ marginLeft: "5rem" }} /> : item && item.submenu && <ExpandMore sx={{ marginLeft: "5rem" }} />}
                </span>
              }
            </Link>

            {item.submenu && activeMenu == index && (
              <ul style={{ marginLeft: "20px", padding: "0", listStyle: "none" }}>
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subItem.id} style={{ padding: "5px 0" }}>
                    <Link
                      to={subItem.link}
                      className={location.pathname === subItem.link ? "active" : ""}
                      onMouseEnter={() => handleSubMouseEnter(subIndex)}
                      onMouseLeave={handleSubMouseLeave}
                      style={{ display: "flex", alignItems: "center", padding: "5px 20px" }}
                    >
                      <img src={location.pathname === subItem.link || hoveredSubIndex === subIndex ? subItem.activeIcon : subItem.icon} style={{ marginRight: "1rem" }} />
                      <span
                        style={{
                          color: location.pathname === subItem.link || hoveredSubIndex === subIndex ? "#d61346" : "black",
                        }}
                      >
                        {t(subItem.title)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li className="log_out text-light" onClick={_handleLogoutBtn}>
          <Link>
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;