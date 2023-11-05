/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import LazyLoadImage from "components/common/LazyLoadImage";
import TemplateContent from "components/layout/TemplateContent";
import _size from "lodash/size";
import React, { useEffect, useRef, useState } from "react";
import { Button, Overlay, Spinner, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDeleteTopic, actionGetList } from "store/Topic/action";
import FormTopic from "./FormTopic";
function Topic(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.topicReducer);

  const dispatch = useDispatch();
  const onGetListTopic = (body) => dispatch(actionGetList(body));
  const onDeleteTopic = (body) => dispatch(actionDeleteTopic(body));

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState({
    topic: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    if (!isLoading) onGetListTopic(params);
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách chủ đề"
        showNew
        btnProps={{
          onClick: () =>
            setData((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
      >
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
                    onDelete={(e) => {
                      setTooltip((prev) => {
                        return {
                          visible:
                            prev.target === e.target ? !tooltip.visible : true,
                          target: e.target,
                          id: item.id,
                        };
                      });
                    }}
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
      <FormTopic
        data={data}
        onClear={() => setData({ topic: {}, visible: false })}
      />

      <Overlay target={tooltip.target} show={tooltip.visible} placement="top">
        {(props) => (
          <Tooltip id="tooltip" {...props}>
            <div style={{ zIndex: 2 }}>
              Bạn có chắc muốn xóa topic này không?
              <div className="d-flex justify-content-end gap-2 py-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={onCloseTooltip}
                  disabled={actionLoading}
                >
                  Hủy
                </Button>
                <Button
                  size="sm"
                  onClick={() => onDeleteTopic(tooltip.id)}
                  disabled={actionLoading}
                >
                  {actionLoading && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                  Đồng ý
                </Button>
              </div>
            </div>
          </Tooltip>
        )}
      </Overlay>
      {tooltip.visible && (
        <div
          className="position-fixed w-100 h-100 top-0 left-0"
          onClick={onCloseTooltip}
        ></div>
      )}
    </div>
  );
}

export default Topic;
