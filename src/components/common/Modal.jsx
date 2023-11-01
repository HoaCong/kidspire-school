import PropTypes from "prop-types";
import React from "react";

function ModalBlock({
  title = "Modal Title",
  children = "...",
  callback = () => {},
}) {
  return (
    <div
      className="modal fade"
      id="modal"
      tabIndex="-1"
      aria-labelledby="modalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="modalLabel">
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Hủy
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={callback}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ModalBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any,
  callback: PropTypes.func,
};

export default ModalBlock;
