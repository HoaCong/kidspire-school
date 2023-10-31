import { ROUTES } from "./routerWeb";
const MENU = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },

  {
    label: "Người dùng",
    active: false,
    icon: <i className="fas fa-users"></i>,
    sub: [
      { label: "List", src: ROUTES.USER },
      {
        label: "Thêm mới",
        src: ROUTES.ADD_USER,
      },
      {
        label: "Cập nhật",
        src: ROUTES.UPDATE_USER,
      },
    ],
  },
  {
    label: "Thông Báo",
    active: false,
    icon: <i className="fas fa-bell"></i>,
    src: ROUTES.MESSAGES,
  },
  {
    label: "Cài Đặt",
    active: false,
    icon: <i className="fas fa-cog"></i>,
    src: ROUTES.SETTING,
  },
  {
    label: "Sign Out",
    active: false,
    icon: <i className="fas fa-sign-out-alt"></i>,
    src: ROUTES.SIGNOUT,
  },
];
export default MENU;
