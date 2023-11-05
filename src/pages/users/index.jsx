/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import ModalBlock from "components/common/Modal";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList } from "store/User/action";

const roleEnum = {
  1: "Admin",
  2: "Manager",
  3: "User",
};

function Users(props) {
  const { isLoading, isSuccess, isFailure, list, params, meta } = useSelector(
    (state) => state.userReducer
  );
  console.log("Users  list:", list, params);

  const dispatch = useDispatch();
  const onGetListUser = (body) => dispatch(actionGetList(body));

  useEffect(() => {
    if (!isLoading) onGetListUser(params);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-5">
      <TemplateContent title="Danh sách người dùng">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên tài khoản</th>
              <th scope="col">Mật khẩu</th>
              <th scope="col">Email </th>
              <th scope="col">Ngày sinh </th>
              <th scope="col">Quyền </th>
              <th scope="col">Hành động </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={7}>
                  <div
                    className="d-flex justify-content-center align-items-center w-full"
                    style={{ height: 400 }}
                  >
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                </td>
              </tr>
            )}
            {list.map((item, index) => (
              <tr key={item.id}>
                <th scope="row" className="align-middle">
                  {index + 1}
                </th>
                <td className="align-middle">{item.username}</td>
                <td className="align-middle">**********</td>
                <td className="align-middle">{item.email}</td>
                <td className="align-middle">{item.birthday}</td>
                <td className="align-middle">{roleEnum[item.roleid]}</td>
                <td className="align-middle">
                  <ActionTable />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <CustomPagination
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <ModalBlock title="Khóa tài khoản">haha </ModalBlock>
    </div>
  );
}

export default Users;
