import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionDelete, actionGetList, resetData } from "store/Lesson/action";
import TemplateContent from "../../../components/layout/TemplateContent";
import FormLesson from "./FormLesson";

function Lesson(props) {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.lessonReducer);

  const dispatch = useDispatch();
  const onGetListLesson = (body) => dispatch(actionGetList(body));
  const onDeleteLesson = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [detail, setDetail] = useState({
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
    if (!isLoading) onGetListLesson(params);
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListLesson({ ...params, page });
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
        title="Danh sách bài học"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tên bài học</th>
              <th scope="col">Hình ảnh</th>
              <th scope="col">Chủ đề </th>
              <th scope="col">Người tạo </th>
              <th scope="col">Người được chia sẻ </th>
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
            {[1, 2, 3].map((item) => (
              <tr key={item}>
                <th scope="row">{item}</th>
                <td className="align-middle">Bài {item}</td>
                <td className="align-middle">Image {item}</td>
                <td className="align-middle">Chủ đề {item}</td>
                <td className="align-middle">Admin {item}</td>
                <td className="align-middle">Quản lý {item}</td>
                <td className="align-middle">
                  <ActionTable
                    onDetail={() =>
                      setDetail({ info: item, visible: true, type: "detail" })
                    }
                    onEdit={() =>
                      setDetail({ info: item, visible: true, type: "edit" })
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
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormLesson
        data={detail}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn xóa bài học này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteLesson(tooltip.id)}
      />
    </div>
  );
}

export default Lesson;
