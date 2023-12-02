/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Quiz/action";

const initialData = {
  name: "",
  idtopic: undefined,
  idcategory: undefined,
  image: "",
  groupquestion: "",
  // idcreated: 1,
};

const listGroupQuiz = [
  {
    label: "Nhóm lộn xộn",
    value: [3, 6, 7, 10],
  },
  {
    label: "Nhóm ngăn nấp",
    value: [3, 4, 5, 6],
  },
  {
    label: "Nhóm vipro",
    value: [3, 4, 5, 7, 10],
  },
];

function FormQuiz({
  data: { type, visible, info },
  listTopic,
  listCategory,
  onClear,
}) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.quizReducer);

  const {
    data: { user },
  } = useSelector((state) => state.loginReducer);

  const dispatch = useDispatch();
  const onAddQuiz = (body) => dispatch(actionAdd(body));
  const onEditQuiz = (body) => dispatch(actionEdit(body));

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
      if (!newData?.idtopic) newData.idtopic = listTopic[0].id;
      if (!newData?.idcategory) newData.idcategory = listCategory[0].id;
      if (!newData?.groupquestion)
        newData.groupquestion = JSON.stringify(listGroupQuiz[0].value);
      if (type === "create") onAddQuiz(newData);
      if (type === "edit") onEditQuiz(newData);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin bài kiểm tra",
    edit: "Chỉnh sửa bài kiểm tra",
    create: "Thêm mới bài kiểm tra",
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
          <Form.Label htmlFor="Name">Tên bài kiểm tra</Form.Label>
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
          <Form.Label htmlFor="groupquestion">Nhóm câu hỏi</Form.Label>
          <Form.Select
            id="groupquestion"
            aria-label="Nhóm câu hỏi"
            name="groupquestion"
            value={data.groupquestion}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(listGroupQuiz, (item) => (
              <option key={item.value} value={JSON.stringify(item.value)}>
                {item.label}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Image">Hình ảnh</Form.Label>
          <UploadImage
            image={data.image}
            callback={(url) =>
              handleChange({
                target: {
                  name: "image",
                  value: url,
                },
              })
            }
            geometry="radius"
            showUpload={type !== "detail"}
          />
          {error.image && (
            <Form.Text
              id="helperImage"
              danger="true"
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.image}
            </Form.Text>
          )}
        </div>
      </form>
    </ModalBlock>
  );
}

export default FormQuiz;
