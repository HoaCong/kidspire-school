import Footer from "components/footer";
import Header from "components/header";
import { Outlet } from "react-router-dom";
// import styles
import "./layout.scss";
function UserLayout(props) {
  return (
    <>
      <div>
        <Header classHead="container"></Header>
      </div>
      <main className="w-100">
        <div className="layout">
          <div className="min-h-100 container">
            <Outlet />
          </div>
          <Footer />
        </div>
      </main>
    </>
  );
}

export default UserLayout;
