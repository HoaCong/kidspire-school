import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

function ToggleSwitch({ status = false, callback = () => {} }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(status);
  }, [status]);

  return (
    <div className="form-switch fs-5 text">
      <input
        className="form-check-input "
        type="checkbox"
        id="status-block"
        checked={checked}
        data-bs-toggle="modal"
        data-bs-target="#modal"
        onChange={(e) => {
          callback();
          setChecked(!checked);
        }}
      />
    </div>
  );
}

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  callback: PropTypes.func,
};

export default ToggleSwitch;
