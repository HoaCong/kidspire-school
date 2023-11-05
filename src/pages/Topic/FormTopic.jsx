/* eslint-disable react-hooks/exhaustive-deps */
import ModalBlock from "components/common/Modal";
import UploadImage from "components/common/UploadImage";
import _capitalize from "lodash/capitalize";
import _isEmpty from "lodash/isEmpty";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { actionAddTopic, actionEditTopic } from "store/Topic/action";
const initialData = {
  name: "",
  image: "",
};
function FormTopic({ data: { type, visible, topic }, onClear }) {
  const {
    actionStatus: { isLoading, isSuccess },
  } = useSelector((state) => state.topicReducer);

  const dispatch = useDispatch();
  const onAddTopic = (body) => dispatch(actionAddTopic(body));
  const onEditTopic = (body) => dispatch(actionEditTopic(body));

  const [data, setData] = useState(initialData);

  const [error, setError] = useState(initialData);

  useEffect(() => {
    if (!_isEmpty(topic)) setData(topic);
  }, [topic]);

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
      if (type === "create") onAddTopic(data);
      if (type === "edit") onEditTopic(data);
    }
  };
  const handleClose = () => {
    onClear();
    setData(initialData);
    setError(initialData);
  };

  return (
    <ModalBlock
      title={type === "edit" ? "Chỉnh sửa chủ đề" : "Thông tin chủ đề"}
      show={visible}
      onClose={handleClose}
      onSave={handleSubmit}
      hideSave={type === "detail"}
      loading={isLoading}
    >
      <form>
        <div>
          <Form.Label htmlFor="Name">Tên chủ đề</Form.Label>
          <Form.Control
            type="text"
            id="Name"
            name="name"
            defaultValue={topic.name}
            aria-describedby="helperName"
            disabled={type === "detail"}
            onChange={handleChange}
          />
          {error.name && (
            <Form.Text
              id="helperName"
              danger
              bsPrefix="d-inline-block text-danger lh-1"
            >
              {error.name}
            </Form.Text>
          )}
        </div>
        <div className="mt-3">
          <Form.Label htmlFor="Image">Hình ảnh</Form.Label>
          <UploadImage
            image={topic.image}
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
              danger
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

export default FormTopic;
