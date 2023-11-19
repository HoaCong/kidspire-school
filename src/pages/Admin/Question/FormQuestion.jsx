/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Question/action";

const initialData = {
  idtopic: 1,
  idcategory: 1,
  level: 1,
  name: "",
  answera: "",
  answerb: "",
  answerc: "",
  answerd: "",
  answer: "A",
  // "idcreated": 1,
};

const Level = [
  { label: "Cấp độ dễ", value: 1 },
  { label: "Cấp độ trung bình", value: 2 },
  { label: "Cấp độ khó", value: 3 },
];

const ListAnswer = ["A", "B", "C", "D"];

function FormQuestion({
  data: { type, visible, info },
  listTopic,
  listCategory,
  onClear,
}) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.questionReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onAddQuestion = (body) => dispatch(actionAdd(body));
  const onEditQuestion = (body) => dispatch(actionEdit(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(info)) setData(info);
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
      const newData = { ...data, idcreated: +user.id };
      if (type === "create") onAddQuestion(newData);
      if (type === "edit") onEditQuestion(newData);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin câu hỏi",
    edit: "Chỉnh sửa câu hỏi",
    create: "Thêm mới câu hỏi",
  };
  return (
    <ModalBlock
      title={getTitle[type]}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <form className="custom-scrollbar">
        <div>
          <Form.Label htmlFor="topic">Chủ đề</Form.Label>
          <Form.Select
            id="topic"
            aria-label="Chủ đề"
            name="idtopic"
            value={data.idtopic}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(listTopic, (item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="category">Danh mục</Form.Label>
          <Form.Select
            id="category"
            aria-label="Danh mục"
            name="idcategory"
            value={data.idcategory}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(listCategory, (item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="level">Cấp độ</Form.Label>
          <Form.Select
            id="level"
            aria-label="Cấp độ"
            name="level"
            value={data.level}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(Level, (item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Name">Nội dung câu hỏi</Form.Label>
          <Form.Control
            type="text"
            id="Name"
            name="name"
            defaultValue={data.name || ""}
            aria-describedby="helperName"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.name && (
            <Form.Text
              id="helperName"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.name}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="answera">Đáp án A</Form.Label>
          <Form.Control
            type="text"
            id="answera"
            name="answera"
            defaultValue={data.answera || ""}
            aria-describedby="helperAnswerA"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.answera && (
            <Form.Text
              id="helperAnswerA"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.answera}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="answerb">Đáp án B</Form.Label>
          <Form.Control
            type="text"
            id="answerb"
            name="answerb"
            defaultValue={data.answerb || ""}
            aria-describedby="helperAnswerB"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.answerb && (
            <Form.Text
              id="helperAnswerB"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.answerb}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="answerc">Đáp án C</Form.Label>
          <Form.Control
            type="text"
            id="answerc"
            name="answerc"
            defaultValue={data.answerc || ""}
            aria-describedby="helperAnswerC"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.answerc && (
            <Form.Text
              id="helperAnswerC"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.answerc}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="answerd">Đáp án D</Form.Label>
          <Form.Control
            type="text"
            id="answerd"
            name="answerd"
            defaultValue={data.answerd || ""}
            aria-describedby="helperAnswerD"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.answerd && (
            <Form.Text
              id="helperAnswerD"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.answerd}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="answer">Đáp án đúng</Form.Label>
          <Form.Select
            id="answer"
            aria-label="Đáp án đúng"
            name="answer"
            value={data.answer}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(ListAnswer, (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Form.Select>
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormQuestion;
