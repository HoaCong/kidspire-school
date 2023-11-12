/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import _map from "lodash/map";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAdd, actionEdit } from "store/Lesson/action";
const initialData = {
  name: "",
  image: "",
  idTopic: 1,
};

const topicEnum = {
  1: "Topic 1",
  2: "Topic 2",
  3: "Topic 3",
};
function FormLesson({ data: { type, visible, info }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.lessonReducer);

  const dispatch = useDispatch();
  const onAddLesson = (body) => dispatch(actionAdd(body));
  const onEditLesson = (body) => dispatch(actionEdit(body));

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
      if (type === "create") onAddLesson(data);
      if (type === "edit") onEditLesson(data);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  const getTitle = {
    detail: "Thông tin bài học",
    edit: "Chỉnh sửa bài học",
    create: "Thêm mới bài học",
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
      <form>
        <div>
          <Form.Label htmlFor="Name">Tên bài học</Form.Label>
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
          <Form.Label htmlFor="Topic">Chủ đề</Form.Label>
          <Form.Select
            aria-label="Chủ đề"
            name="idTopic"
            value={data.idTopic}
            onChange={handleChange}
            disabled={type === "detail"}
          >
            {_map(topicEnum, (value, index) => (
              <option key={value} value={index}>
                {value}
              </option>
            ))}
          </Form.Select>
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Image">Hình ảnh</Form.Label>
          <UploadImage
            image={data.image || ""}
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

export default FormLesson;
