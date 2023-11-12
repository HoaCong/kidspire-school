import _get from "lodash/get";
export const formatBirthday = (info) => {
  return _get(info, "birthday", "19990131").replace(
    /^(\d{4})(\d{2})(\d{2})$/,
    "$1-$2-$3"
  );
};

export const roleEnum = {
  1: "Admin",
  2: "Manager",
  3: "User",
};
