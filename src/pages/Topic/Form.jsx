import ModalBlock from "components/common/Modal";
import UploadImage from "components/user/UploadImage";
import PropTypes from "prop-types";
import React from "react";
import Form from "react-bootstrap/Form";
function FormTopic({ data: { type, visible, topic }, onClear }) {
  const handleSubmit = (data) => {};
  return (
    <ModalBlock
      title={type === "edit" ? "Chỉnh sửa chủ đề" : "Thông tin chủ đề"}
      show={visible}
      onClose={onClear}
      onSave={handleSubmit}
      hideSave={type === "detail"}
    >
      <form>
        <div>
          <Form.Label htmlFor="Name">Tên chủ đề</Form.Label>
          <Form.Control
            type="text"
            id="Name"
            name="name"
            value={topic.name}
            aria-describedby="helperName"
            disabled={type === "detail"}
          />
          <Form.Text
            id="helperName"
            danger
            bsPrefix="d-inline-block text-danger lh-1"
          >
            Name required
          </Form.Text>
        </div>
        <div>
          <Form.Label htmlFor="Image">Hình ảnh</Form.Label>
          <UploadImage
            image={topic.image}
            callback={(url) => console.log(url)}
            geometry="radius"
          />
          <Form.Text
            id="helperImage"
            danger
            bsPrefix="d-inline-block text-danger lh-1"
          >
            Image required
          </Form.Text>
        </div>
      </form>
    </ModalBlock>
  );
}

FormTopic.propTypes = {};

export default FormTopic;
