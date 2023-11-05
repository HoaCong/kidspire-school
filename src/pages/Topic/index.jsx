/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList } from "store/Topic/action";
import FormTopic from "./Form";
function Topic(props) {
  const { isLoading, isSuccess, isFailure, list, params, meta } = useSelector(
    (state) => state.topicReducer
  );

  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({ topic: {}, visible: false, type: "" });

  useEffect(() => {
    if (!isLoading) onGetListTopic(params);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-5">
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
                  <ActionTable
                    onDetail={() =>
                      setData({ topic: item, visible: true, type: "detail" })
                    }
                    onEdit={() =>
                      setData({ topic: item, visible: true, type: "edit" })
                    }
                    // onDelete={() => setData({ topic: item, show: true })}
                  />
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
      {data.visible && (
        <FormTopic
          data={data}
          onClear={() => setData({ topic: {}, visible: false })}
        />
      )}
    </div>
  );
}

export default Topic;
