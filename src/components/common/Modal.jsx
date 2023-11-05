import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalBlock(props) {
  const {
    show = false,
    title = "Title",
    children,
    onClose,
    onSave,
    hideSave,
    propsModal,
  } = props;

  return (
    <Modal show={show} onHide={onClose} {...propsModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        {!hideSave && (
          <Button variant="primary" onClick={onSave}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalBlock;
