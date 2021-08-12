import { useSelector } from "react-redux";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import appNavbarMenu from "../constant/app-navbar-menu";
import {
  baseApiUrl,
  defaultProfileImage,
  generateUrl,
  imgUrl,
  profileImage,
} from "../../utils/utils";
import UserProfilePictureComponent from "../../components/UserProfilePictureComponent";

function AppNavbar() {
  let userStore = useSelector((state) => state.UserStore);
  let baseUrl = baseApiUrl.replace("/api", "");

  return (
    <div className="bg-primary shadow">
      <nav className="container-fluid navbar navbar-expand-lg navbar-dark">
        <Link to="/" className="navbar-brand">
          <span className="far fa-calendar-check mx-1 text-lightgreen"></span>
          <span className="font-weight-bold">
            Team <span className="text-lightgreen">Zone</span>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#app_navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse collapse" id="app_navbar">
          <ul className="navbar-nav ml-auto">
            {appNavbarMenu.map((item, itemIndex) => (
              <li className="nav-item" key={`navbar_item_${itemIndex}`}>
                <NavLink
                  to={item.path}
                  title={item.label}
                  className="nav-link"
                  activeClassName="active-page"
                  exact
                >
                  <span className={item.icon}></span>
                  <span className="mx-1">{item.title}</span>
                </NavLink>
              </li>
            ))}
            <li className="nav-item dropdown dropleft">
              <a
                href=""
                className="nav-link text-white dropdown-toggle"
                data-toggle="dropdown"
              >
                {/* <span className="far fa-user-circle mx-1"></span> */}
                <img
                  src={
                    userStore.data.image
                      ? profileImage(userStore.data.image.url)
                      : defaultProfileImage()
                  }
                  alt="user avatar"
                  className="rounded-circle mx-1 img-fluid icon-img"
                  style={{ width:25 }}
                />
                <span>{userStore.data.name}</span>
              </a>
              <div className="dropdown-menu dropdown-menu-left">
                <Link
                  to="/profile"
                  className="dropdown-item"
                  title="view user profile data"
                >
                  {/* <span className="far fa-user-circle text-primary mx-1"></span> */}
                  <img
                    src={imgUrl("user-default.png")}
                    alt="user profile"
                    className="icon-img-sm mr-1"
                  />
                  <span>Profile</span>
                </Link>
                <div className="dropdown-divider"></div>
                <a
                  href={`${baseUrl}/logout`}
                  className="dropdown-item small"
                  title="logout"
                >
                  <span className="fa fa-door-open text-danger mr-1"></span>
                  <span>logout</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default AppNavbar;
