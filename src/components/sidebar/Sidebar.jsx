import "./sidebar.css";
import {
  BiArchive,
  MdiLabelOutline,
  BiTrash,
  BiHouseDoor,
} from "assets/icons/Icons";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  return (
    <aside className="sidebar">
      <ul>
        <Link to="/notes">
          <li
            className={`sidebar-item ${
              location.pathname === "/notes" && "active"
            }`}
          >
            {" "}
            <BiHouseDoor className="fs-s" />
            <span className="fs-s">Home</span>
          </li>
        </Link>

        <Link to="/label">
          <li
            className={`sidebar-item ${
              location.pathname === "/label" && "active"
            }`}
          >
            {" "}
            <MdiLabelOutline className="fs-s" />
            <span className="fs-s">Labels</span>
          </li>
        </Link>

        <Link to="/archive">
          <li
            className={`sidebar-item ${
              location.pathname === "/archive" && "active"
            }`}
          >
            {" "}
            <BiArchive className="fs-s" />
            <span className="fs-s">Archive</span>
          </li>
        </Link>

        <Link to="/trash">
          <li
            className={`sidebar-item ${
              location.pathname === "/trash" && "active"
            }`}
          >
            {" "}
            <BiTrash className="fs-s" />
            <span className="fs-s">Trash</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export { Sidebar };
