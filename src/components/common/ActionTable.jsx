import PropTypes from "prop-types";

function ActionTable({ onDetail, onEdit, onDelete }) {
  return (
    <div className="d-flex gap-2">
      <button
        className=" btn btn-outline-primary rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: 30, height: 30 }}
        onClick={onDetail}
      >
        <i className="far fa-eye"></i>
      </button>
      <button
        className=" btn btn-outline-warning rounded-circle d-flex justify-content-center align-items-center"
        style={{ width: 30, height: 30 }}
        onClick={onEdit}
      >
        <i className="fas fa-pencil-alt"></i>
      </button>
      {onDelete && (
        <button
          className="btn btn-outline-danger rounded-circle d-flex justify-content-center align-items-center"
          style={{ width: 30, height: 30 }}
          onClick={onDelete}
        >
          <i className="far fa-trash-alt"></i>
        </button>
      )}
    </div>
  );
}

ActionTable.propTypes = {
  onDetail: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActionTable;
