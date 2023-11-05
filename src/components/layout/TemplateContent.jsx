import PropTypes from "prop-types";
import React from "react";

function TemplateContent({ title, children, showNew, cardProps, btnProps }) {
  return (
    <div className="d-grid gap-3 mt-2" id="template">
      <div className="col-12 card">
        <div className="card-body d-flex justify-content-between align-items-center">
          <h5 className="m-0 title">
            <strong>{title}</strong>
          </h5>
          {showNew && (
            <button type="button" className="btn btn-primary" {...btnProps}>
              Thêm mới
            </button>
          )}
        </div>
      </div>

      <div className="col-12 card" {...cardProps}>
        <div className="card-body">{children}</div>
      </div>
    </div>
  );
}

TemplateContent.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  showNew: PropTypes.bool,
  cardProps: PropTypes.object,
  btnProps: PropTypes.object,
};

export default TemplateContent;
