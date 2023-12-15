/* eslint-disable react-hooks/exhaustive-deps */
import ActionTable from "components/common/ActionTable";
import CustomPagination from "components/common/CustomPagination";
import CustomTooltip from "components/common/CustomTooltip";
import LinearProgress from "components/common/LinearProgress";
import _map from "lodash/map";
import _omit from "lodash/omit";
import _size from "lodash/size";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { actionGetList as callListCategory } from "store/Category/action";
import { actionDelete, actionGetList, resetData } from "store/Question/action";
import { actionGetList as callListTopic } from "store/Topic/action";
import TemplateContent from "../../../components/layout/TemplateContent";
import FormQuestion from "./FormQuestion";

const EnumAnswer = {
  A: "answera",
  B: "answerb",
  C: "answerc",
  D: "answerd",
};

const initialData = { idtopic: 0, idcategory: 0 };

function Question() {
  const {
    listStatus: { isLoading },
    actionStatus: { isLoading: actionLoading, isSuccess: actionSuccess },
    list,
    params,
    meta,
  } = useSelector((state) => state.questionReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const { list: listTopic } = useSelector((state) => state.topicReducer);
  const { list: listCategory } = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();
  const onGetListQuestion = (body) => dispatch(actionGetList(body));
  const onGetListCategory = (body) => dispatch(callListCategory(body));
  const onGetListTopic = (body) => dispatch(callListTopic(body));
  const onDeleteQuestion = (body) => dispatch(actionDelete(body));
  const onResetData = () => dispatch(resetData());

  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(initialData);
  const [detail, setDetail] = useState({
    info: {},
    visible: false,
    type: "",
  });
  const [tooltip, setTooltip] = useState({
    target: null,
    visible: false,
    id: null,
  });

  useEffect(() => {
    if (!isLoading) {
      onGetListQuestion(params);
      onGetListTopic({ page: 1, limit: 30 });
      onGetListCategory({ page: 1, limit: 50 });
    }
    return () => {
      onResetData();
    };
  }, []);

  useEffect(() => {
    if (actionSuccess) onCloseTooltip();
  }, [actionSuccess]);

  const getAnswerTrue = (key, value) => {
    return EnumAnswer[key] === value ? "text-success" : "text-danger";
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onGetListQuestion({ ...params, page });
  };

  const onCloseTooltip = () => {
    setTooltip({
      visible: false,
      target: null,
      id: null,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSearch = (type) => {
    const idtopic = !+data.idtopic || type === "reset" ? null : data.idtopic;
    const idcategory =
      !+data.idcategory || type === "reset" ? null : data.idcategory;
    const newParams = _omit(params, ["idtopic", "idcategory"]);
    onGetListQuestion({ ...newParams, page: 1, idtopic, idcategory });
    setCurrentPage(1);
    if (type === "reset") setData(initialData);
  };
  return (
    <div className="mb-5">
      <TemplateContent
        title="Danh sách câu hỏi"
        showNew
        btnProps={{
          onClick: () =>
            setDetail((prev) => ({ ...prev, visible: true, type: "create" })),
        }}
        filter={
          <div className="d-flex align-items-end">
            <div style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="topic">Chủ đề</Form.Label>
              <Form.Select
                id="topic"
                aria-label="Chủ đề"
                name="idtopic"
                value={data.idtopic}
                onChange={handleChange}
              >
                {_map([{ id: 0, name: "Tất cả" }, ...listTopic], (item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="ms-2" style={{ width: "100%", maxWidth: 250 }}>
              <Form.Label htmlFor="category">Danh mục</Form.Label>
              <Form.Select
                id="category"
                aria-label="Danh mục"
                name="idcategory"
                value={data.idcategory}
                onChange={handleChange}
              >
                {_map([{ id: 0, name: "Tất cả" }, ...listCategory], (item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="ms-2">
              <Button onClick={() => handleSearch("filter")}>Tìm kiếm</Button>
            </div>
            <div className="ms-2">
              <Button
                variant="outline-secondary"
                onClick={() => handleSearch("reset")}
              >
                Đặt lại
              </Button>
            </div>
          </div>
        }
      >
        <div className="custom-scrollbar">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="max-w-max">
                  #
                </th>
                <th scope="col" className="min-w-300px">
                  Nội dung câu hỏi
                </th>
                <th scope="col" className="min-w-150px">
                  Đáp án A
                </th>
                <th scope="col" className="min-w-150px">
                  Đáp án B
                </th>
                <th scope="col" className="min-w-150px">
                  Đáp án C
                </th>
                <th scope="col" className="min-w-150px">
                  Đáp án D
                </th>
                <th scope="col" className="min-w-100px">
                  Chủ đề
                </th>
                <th scope="col" className="min-w-100px">
                  Danh mục
                </th>
                <th scope="col" className="min-w-100px">
                  Người tạo
                </th>
                <th scope="col" className="min-w-100px">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && _size(list) === 0 && (
                <tr>
                  <td colSpan={9}>
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
              {_map(list, (item, index) => (
                <tr key={`${index}-${item.created_at}`}>
                  <th scope="row" className="align-middle">
                    {index + 1}
                  </th>
                  <td className="align-middle"> {item.name}</td>
                  <td
                    className={`align-middle ${getAnswerTrue(
                      item.answer,
                      "answera"
                    )}`}
                  >
                    {item.answera}
                  </td>
                  <td
                    className={`align-middle ${getAnswerTrue(
                      item.answer,
                      "answerb"
                    )}`}
                  >
                    {item.answerb}
                  </td>
                  <td
                    className={`align-middle ${getAnswerTrue(
                      item.answer,
                      "answerc"
                    )}`}
                  >
                    {item.answerc}
                  </td>
                  <td
                    className={`align-middle ${getAnswerTrue(
                      item.answer,
                      "answerd"
                    )}`}
                  >
                    {item.answerd}
                  </td>
                  <td className="align-middle">{item.topic?.name || "-"}</td>
                  <td className="align-middle">{item.category?.name || "-"}</td>
                  <td className="align-middle">
                    {item.created?.username || "-"}
                  </td>
                  <td className="align-middle">
                    <ActionTable
                      propsEdit={{ disabled: item.idcreated !== user.id }}
                      propsDelete={{ disabled: item.idcreated !== user.id }}
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
                              prev.target === e.target
                                ? !tooltip.visible
                                : true,
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
        </div>
        {isLoading && _size(list) > 0 && (
          <div className="-mb-1">
            <LinearProgress />
          </div>
        )}
        <CustomPagination
          loading={isLoading}
          totalItems={meta.total}
          perPage={params.limit}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </TemplateContent>
      <FormQuestion
        data={detail}
        listTopic={listTopic}
        listCategory={listCategory}
        onClear={() => setDetail({ info: {}, visible: false, type: "" })}
      />
      <CustomTooltip
        content="Bạn có chắc muốn xóa câu hỏi này không?"
        tooltip={tooltip}
        loading={actionLoading}
        onClose={onCloseTooltip}
        onDelete={() => onDeleteQuestion(tooltip.id)}
      />
    </div>
  );
}

export default Question;