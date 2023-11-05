import { ROUTES } from "./routerWeb";
const MENU = [
  {
    label: "Dashboard",
    active: false,
    src: ROUTES.DASHBOARD,
    icon: <i className="fas fa-home"></i>,
  },
  {
    label: "User",
    active: false,
    src: ROUTES.USER,
    icon: <i className="fas fa-users"></i>,
  },
  // {
  //   label: "Người dùng",
  //   active: false,
  //   icon: <i className="fas fa-users"></i>,
  //   sub: [
  //     { label: "List", src: ROUTES.USER },
  //     {
  //       label: "Thêm mới",
  //       src: ROUTES.ADD_USER,
  //     },
  //     {
  //       label: "Cập nhật",
  //       src: ROUTES.UPDATE_USER,
  //     },
  //   ],
  // },
  {
    label: "Topic",
    active: false,
    src: ROUTES.TOPIC,
    icon: <i className="fas fa-shapes"></i>,
  },
  {
    label: "Category",
    active: false,
    src: ROUTES.CATEGORY,
    icon: <i className="fas fa-sitemap"></i>,
  },
  {
    label: "Lesson",
    active: false,
    src: ROUTES.LESSON,
    icon: <i className="fas fa-book-open"></i>,
  },

  // {
  //   label: "Thông Báo",
  //   active: false,
  //   icon: <i className="fas fa-bell"></i>,
  //   src: ROUTES.MESSAGES,
  // },
  // {
  //   label: "Cài Đặt",
  //   active: false,
  //   icon: <i className="fas fa-cog"></i>,
  //   src: ROUTES.SETTING,
  // },
  // {
  //   label: "Sign Out",
  //   active: false,
  //   icon: <i className="fas fa-sign-out-alt"></i>,
  //   src: ROUTES.SIGNOUT,
  // },
];
export default MENU;
