import { ROUTES } from "constants/routerWeb";
import React from "react";
import { Link } from "react-router-dom";
import "../Login/index.scss";

function Register(props) {
  return (
    <section className="vh-100 bg-login">
      <div className="container-fluid h-custom">
        <form className="form-login">
          <div className="divider d-flex align-items-center my-3">
            <h1 className="text-center mx-3 mb-0 font-bold">REGISTER</h1>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control is-invalid"
              id="username"
            />
            <label htmlFor="username">Username</label>
          </div>
          <small className="d-block text-danger -mt-3">abc</small>
          <div className="form-floating form-floating-sm mb-3">
            <input
              type="email"
              className="form-control is-invalid"
              id="email"
            />
            <label htmlFor="email">Email</label>
          </div>
          <small className="d-block text-danger -mt-3">abc</small>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control is-invalid input-sm"
              id="pwd"
            />
            <label htmlFor="pwd">Password</label>
          </div>
          <small className="d-block text-danger -mt-3">abc</small>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control is-invalid"
              id="re_pwd"
            />
            <label htmlFor="re_pwd">Repeat Password</label>
          </div>
          <small className="d-block text-danger -mt-3">abc</small>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-lg px-3 w-100"
              style={{ width: 200 }}
            >
              REGISTER
            </button>
          </div>
          <Link
            to={ROUTES.LOGIN}
            className="d-block text-black-50 text-end mt-1"
            role="button"
          >
            Already an account.
            <span className="text-primary"> Login!</span>
          </Link>
        </form>
      </div>
      <div className="text-center py-4 px-4 px-xl-5 bg-secondary text-white">
        Copyright © 2023. All rights reserved.
      </div>
    </section>
  );
}

export default Register;
