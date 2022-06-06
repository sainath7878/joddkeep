import "./sidebar.css";
import {
  BiArchive,
  MdiLabelOutline,
  BiTrash,
  BiHouseDoor,
} from "assets/icons/Icons";
import { NavLink } from "react-router-dom";
import { useSidebar } from "context";

const sidebarData = [
  { link: "/notes", icon: BiHouseDoor, text: "Home", class: "fs-s" },
  { link: "/label", icon: MdiLabelOutline, text: "Labels", class: "fs-s" },
  { link: "/archive", icon: BiArchive, text: "Archive", class: "fs-s" },
  { link: "/trash", icon: BiTrash, text: "Trash", class: "fs-s" },
];

function Sidebar() {
  const getActiveStyle = (isActive) => {
    return isActive ? "active" : null;
  };
  const { showSidebar } = useSidebar();
  return (
    <aside
      className={`sidebar ${
        showSidebar ? "sidebar-responsive-show" : "sidebar-responsive-hide"
      }`}
    >
      <ul className="sidebar-list">
        {sidebarData.map((item, index) => {
          return (
            <li key={index}>
              <NavLink
                to={`${item.link}`}
                className={`sidebar-item ${({ isActive }) =>
                  getActiveStyle(isActive)}`}
              >
                <item.icon className="fs-s" />
                <span className="fs-s">{item.text}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export { Sidebar };
