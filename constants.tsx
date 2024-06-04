import { FaHome } from "react-icons/fa";
import { FaLeaf } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Trang chính",
    path: "/",
    icon: <FaHome width={24} height={24}/>,
  },
  {
    title: "Cây cảnh",
    path: "/plants",
    icon: <FaLeaf width={24} height={24}/>,
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: <FaHistory width={24} height={24}/>,
  },
];
