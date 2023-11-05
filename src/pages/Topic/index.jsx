/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList } from "store/Topic/action";
import ModalBlock from "../../components/common/Modal";
import TemplateContent from "../../components/layout/TemplateContent";

function Topic(props) {
  const { isLoading, isSuccess, isFailure, list, params, meta } = useSelector(
    (state) => state.topicReducer
  );
  console.log("Topic  list:", list, params);

  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoading) onGetListTopic(params);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <TemplateContent title="Danh sách chủ đề">
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
    </>
  );
}

export default Topic;
