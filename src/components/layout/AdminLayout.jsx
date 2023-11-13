import Footer from "components/footer";
import Header from "components/header";
import Menu from "components/menu";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
// import styles
import "./layout.scss";
function AdminLayout(props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div>
        <Header>
          <button
            className="btn-mobile"
            onClick={() => {
              setCollapsed((prev) => !prev);
            }}
          >
            <i className="fas fa-bars fs-3"></i>
          </button>
        </Header>
      </div>
      <div className="d-flex">
        <Menu collapsed={collapsed} />
        <main className="w-100">
          <div className="layout">
            <div className="min-h-100">
              <Outlet />
            </div>
            <Footer />
          </div>
        </main>
      </div>
    </>
  );
}

export default AdminLayout;
