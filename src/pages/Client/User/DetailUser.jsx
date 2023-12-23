import _capitalize from "lodash/capitalize";
import { formatBirthday2 } from "pages/Admin/User/helper";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateUserLogin } from "store/Login/action";
import { actionDetail, actionUpdate } from "store/User/action";
/* eslint-disable react-hooks/exhaustive-deps */
const initialData = {
  username: "",
  email: "",
  birthday: "",
  password: "",
};

function DetailUser() {
  const {
    listStatus: { isLoading, isSuccess },
    actionStatus: { isLoading: loading, isSuccess: success },
    detail,
  } = useSelector((state) => state.userReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onUpdateUser = (body) => dispatch(actionUpdate(body));
  const onGetDetailUser = (id) => dispatch(actionDetail(id));
  const onUpdateUserLogin = (id) => dispatch(actionUpdateUserLogin(id));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

  useEffect(() => {
    if (!isLoading) {
      onGetDetailUser(user?.id);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setData({ ...detail, birthday: formatBirthday2(detail.birthday) });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (success && data.username !== user?.username) {
      onUpdateUserLogin({ username: data.username });
      localStorage.setItem("username", data.username);
    }
  }, [success]);

  const handleSubmit = () => {
    const tmpKey = Object.keys(data);
    let validates = true;
    tmpKey.forEach((key) => {
      if (data[key] === "") {
        setError((prevError) => ({
          ...prevError,
          [key]: `${_capitalize(key)} required`,
        }));
        validates = false;
      }
    });
    if (validates) {
      onUpdateUser({ ...data, birthday: data.birthday.split("-").join("") });
    }
  };
  return (
    <>
      <div className="row mt-3">
        <div className="col-12 col-md-8 mx-auto">
          <h4>Cập nhật tài khoản</h4>
          {isLoading && (
            <div
              className="d-flex justify-content-center align-items-center w-full"
              style={{ height: 400 }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          )}
          {isSuccess && (
            <>
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="Tên tài khoản"
                  value={data.username}
                  onChange={handleChange}
                />
                <label htmlFor="username">Tên tài khoản</label>
              </div>
              {error.username && (
                <small className="text-danger">{error.username}</small>
              )}

              <div className="form-floating mt-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={data.email}
                  onChange={handleChange}
                  disabled
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mt-3">
                <input
                  type="date"
                  id="Birthday"
                  name="birthday"
                  className="form-control"
                  defaultValue={data.birthday}
                  onChange={handleChange}
                />
                <label htmlFor="Birthday">Ngày sinh</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={data.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Mật khẩu</label>
              </div>
              {error.password && (
                <small className="text-danger">{error.password}</small>
              )}
              <div className="text-end my-3">
                <Button
                  variant="secondary"
                  disabled={loading}
                  onClick={handleSubmit}
                >
                  {loading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Save changes
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DetailUser;
