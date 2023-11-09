/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import _capitalize from "lodash/capitalize";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/User/action";
const initialData = {
  username: "",
  email: "",
  birthday: "",
  password: "",
  roleid: 1,
};

const roleEnum = {
  1: "Admin",
  2: "Manager",
  3: "User",
};

function FormUser({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();
  const onAddUser = (body) => dispatch(actionAdd(body));
  const onEditUser = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) {
      const birthday = _get(info, "birthday", "19990131").replace(
        /^(\d{4})(\d{2})(\d{2})$/,
        "$1-$2-$3"
      );
      setData({ ...info, birthday });
    }
  }, [info]);

  useEffect(() => {
    if (isSuccess) {
      onClear();
      setData(initialData);
    }
  }, [isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
    setError((prevError) => ({ ...prevError, [name]: "" }));
  };

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
      if (type === "create")
        onAddUser({ ...data, birthday: data.birthday.split("-").join("") });
      if (type === "edit")
        onEditUser({ ...data, birthday: data.birthday.split("-").join("") });
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  return (
    <ModalBlock
      title={type === "edit" ? "Chỉnh sửa tài khoản" : "Thông tin tài khoản"}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <form>
        <div>
          <Form.Label htmlFor="Username">Tên tài khoản</Form.Label>
          <Form.Control
            type="text"
            id="Username"
            name="username"
            defaultValue={data.username}
            aria-describedby="helperUsername"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.username && (
            <Form.Text
              id="helperUsername"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.username}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Name">Email</Form.Label>
          <Form.Control
            type="email"
            id="Email"
            name="email"
            defaultValue={data.email}
            aria-describedby="helperEmail"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.email && (
            <Form.Text
              id="helperEmail"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.email}
            </Form.Text>
          )}
        </div>

        <div className="mt-3">
          <Form.Label htmlFor="Name">Ngày sinh</Form.Label>
          <Form.Control
            type="date"
            id="Birthday"
            name="birthday"
            defaultValue={data.birthday}
            aria-describedby="helperBirthday"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.birthday && (
            <Form.Text
              id="helperBirthday"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.birthday}
            </Form.Text>
          )}
        </div>

        <div className="mt-3">
          <Form.Label htmlFor="Name">Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            id="Password"
            name="password"
            defaultValue={data.password}
            aria-describedby="helperPassword"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.password && (
            <Form.Text
              id="helperPassword"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.password}
            </Form.Text>
          )}
        </div>

        <div className="mt-3">
          <Form.Label htmlFor="Role">Quyền</Form.Label>
          <Form.Select
            aria-label="Quyền"
            name="roleid"
            value={data.roleid}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(roleEnum, (value, index) => (
              <option key={value} value={index}>
                {value}
              </option>
            ))}
          </Form.Select>
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormUser;
