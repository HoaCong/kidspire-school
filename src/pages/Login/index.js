import kid from "assets/images/kid.jpg";
import React from "react";
import "./index.scss";
function Login(props) {
  return (
    <section className="vh-100 bg-login">
      <div className="container-fluid h-custom">
        <form className="form-login">
          <div className="divider d-flex align-items-center my-4">
            <h1 className="text-center mx-3 mb-0 font-bold">LOGIN</h1>
          </div>

          <div className="form-floating mb-3">
            <input type="email" className="form-control" id="email" />
            <label htmlFor="email">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input type="password" className="form-control" id="pwd" />
            <label htmlFor="pwd">Password</label>
          </div>

          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <div class="form-check">
              <input
                className="form-check-input "
                type="checkbox"
                value=""
                id="remember"
              />
              <label class="form-check-label text-black-50" htmlFor="remember">
                Remember me
              </label>
            </div>
            <div className="text-black-50">Forgot password?</div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="btn btn-secondary btn-lg px-3 w-100"
              style={{ width: 200 }}
            >
              SIGN IN
            </button>
          </div>
        </form>
      </div>
      <div className="text-center py-4 px-4 px-xl-5 bg-secondary text-white">
        Copyright © 2023. All rights reserved.
      </div>
    </section>
  );
}

export default Login;
