import Footer from "components/footer";
import Header from "components/header";
import { Link, Outlet } from "react-router-dom";
// import styles
import { ROUTES } from "constants/routerWeb";
import "./layout.scss";
function UserLayout(props) {
  return (
    <>
      <div>
        <Header classHead="container">
          <div className="me-auto">
            <Link to={ROUTES.TOPIC}>
              <span className="fs-5 text">Topic</span>
            </Link>
            <Link to={ROUTES.QUIZ} className="ms-2">
              <span className="fs-5 text">Quiz</span>
            </Link>
          </div>
        </Header>
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
