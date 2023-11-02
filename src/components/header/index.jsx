import avatar from "assets/images/avatar.png";
import logo from "assets/images/logo-kid.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
function Footer() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="header">
      <div className="d-flex h-100 justify-content-between align-items-center px-2">
        {/* Logo header */}
        <div className="logo-header d-flex align-items-center gap-2">
          <Link to="/">
            <img className="logo-header-img" src={logo} alt="logo kid" />
          </Link>
          <Link to="/">
            <h2 className="brand-header mb-1">Kidspire</h2>
          </Link>
        </div>
        {/* Right header */}
        <div className=" d-flex justify-content-end align-items-center gap-4 mx-1">
          <div
            onClick={() => setIsActive((prev) => !prev)}
            className="account-header d-flex gap-2 align-items-center"
          >
            <img className="avatar-account" src={avatar} alt="avatar" />
            <div className="account-info">
              <b className="user-role m-0">Admin</b>
            </div>
            <i className="fas fa-chevron-down"></i>
            <ul
              className={`${
                !isActive ? "d-none" : ""
              } sub-menu-account list-unstyled`}
            >
              <li>
                <Link>My Profile</Link>
              </li>
              <li>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
