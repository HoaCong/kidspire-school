import { ROUTES } from "./routerWeb";
const MENU = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.ADMIN_DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "User",
    active: false,
    src: ROUTES.ADMIN_USER,
    icon: <i className="fas fa-users"></i>,
  },
  // {
  //   label: "Người dùng",
  //   active: false,
  //   icon: <i className="fas fa-users"></i>,
  //   sub: [
  //     { label: "List", src: ROUTES.ADMIN_USER },
  //     {
  //       label: "Thêm mới",
  //       src: ROUTES.ADMIN_ADD_USER,
  //     },
  //     {
  //       label: "Cập nhật",
  //       src: ROUTES.ADMIN_UPDATE_USER,
  //     },
  //   ],
  // },
  {
    label: "Topic",
    active: false,
    src: ROUTES.ADMIN_TOPIC,
    icon: <i className="fas fa-shapes"></i>,
  },
  {
    label: "Category",
    active: false,
    src: ROUTES.ADMIN_CATEGORY,
    icon: <i className="fas fa-sitemap"></i>,
  },
  {
    label: "Lesson",
    active: false,
    src: ROUTES.ADMIN_LESSON,
    icon: <i className="fas fa-book-open"></i>,
  },

  // {
  //   label: "Thông Báo",
  //   active: false,
  //   icon: <i className="fas fa-bell"></i>,
  //   src: ROUTES.ADMIN_MESSAGES,
  // },
  // {
  //   label: "Cài Đặt",
  //   active: false,
  //   icon: <i className="fas fa-cog"></i>,
  //   src: ROUTES.ADMIN_SETTING,
  // },
  // {
  //   label: "Sign Out",
  //   active: false,
  //   icon: <i className="fas fa-sign-out-alt"></i>,
  //   src: ROUTES.ADMIN_SIGNOUT,
  // },
];
export default MENU;
