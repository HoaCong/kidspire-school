/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import ModalBlock from "components/common/Modal";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList } from "store/Category/action";

function Category(props) {
  const { isLoading, list, params, meta } = useSelector(
    (state) => state.categoryReducer
  );

  const dispatch = useDispatch();
  const onGetListCategory = (body) => dispatch(actionGetList(body));

  useEffect(() => {
    if (!isLoading) onGetListCategory(params);
  }, []);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-5">
      <TemplateContent title="Danh sách danh mục">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Chủ đề</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && _size(list) === 0 && (
              <tr>
                <td colSpan={4}>
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
                <td className="align-middle">{item.name}</td>
                <td className="align-middle">
                  <LazyLoadImage
                    src={item.image}
                    alt={item.name}
                    witdh={50}
                    height={50}
                  />
                </td>
                <td className="align-middle" style={{ width: 200 }}>
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
      <ModalBlock title="Khóa tài khoản">haha</ModalBlock>
    </div>
  );
}

export default Category;
