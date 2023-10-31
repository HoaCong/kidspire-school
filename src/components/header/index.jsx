import logo from "assets/images/logo-kid.png";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.scss";
function Footer(props) {
  const [isActive, setIsActive] = useState(false);
  const { children } = props;

  return (
    <div className="header">
      <div className="d-flex h-100 justify-content-between align-items-center px-2">
        {/* Logo header */}
        <div className="logo-header d-flex align-items-center gap-2">
          <div>{children}</div>
          <Link>
            <img className="logo-header-img" src={logo} alt="logo kid" />
          </Link>
          <Link>
            <h2 className="brand-header mb-1">Kidspire</h2>
          </Link>
        </div>
        {/* Right header */}
        <div className=" d-flex justify-content-end align-items-center gap-4 mx-1">
          <div className="search-bar">
            <button className="search-logo" style={{ border: "none" }}>
              <img className="search-img" src="" alt="" />
            </button>
            <input
              className="search-input"
              type="text"
              placeholder="Type anything for me..."
            />
          </div>
          <div className="notification">
            <img className="noti-img" src="" alt="" />
            <span className="badge">4</span>
          </div>
          <div
            onClick={() => setIsActive((prev) => !prev)}
            className="account-header d-flex gap-2 align-items-center"
          >
            <img className="avatar-account" src="" alt="" />
            <div className="account-info">
              <p className="user-name m-0">
                <b>Kim Trầm</b>
              </p>
              <p className="user-role m-0">Admin</p>
            </div>
            <img className="drop-down-header" src="" alt="" />
            <ul
              className={`${
                !isActive ? "d-none" : ""
              } sub-menu-account list-unstyled`}
            >
              <li>
                <Link>My Profile</Link>
              </li>
              <li>
                <Link>Setting</Link>
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
