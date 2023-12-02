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
  {
    label: "Question",
    active: false,
    src: ROUTES.ADMIN_QUESTION,
    icon: <i className="fas fa-question"></i>,
  },
  {
    label: "Quiz",
    active: false,
    src: ROUTES.ADMIN_QUIZ,
    icon: <i className="far fa-question-circle"></i>,
  },
];
export default MENU;
