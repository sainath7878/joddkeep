import {
  BiPin,
  BiPinFill,
  BiTrash,
  BiPencil,
  MdiArchiveArrowDownOutline,
} from "assets/icons/Icons";
import { useNotes, useTrash } from "context";
import "./displayNote.css";

function DisplayNote({ note }) {
  const { title, color, description, label, priority, isPinned } = note;
  const { pinHandler } = useNotes();

  const { trashHandler } = useTrash();

  return (
    <div className="display-notes" style={{ backgroundColor: color }}>
      {isPinned ? (
        <button
          className="btn-pin"
          type="button"
          onClick={() => pinHandler(note)}
        >
          <BiPinFill className="fs-m" />
        </button>
      ) : (
        <button
          className="btn-pin"
          type="button"
          onClick={() => pinHandler(note)}
        >
          <BiPin className="fs-m" />
        </button>
      )}
      <div className="display-notes-text">
        <h2 className="fs-m">{title}</h2>
        <p className="fs-s">{description}</p>
      </div>
      <div className="display-cta">
        <div className="d-flex">
          <h3 className="fs-s labels">{label}</h3>
          <h3 className="fs-s priority">{priority}</h3>
        </div>
        <div className="display-cta-section">
          <button>
            <BiPencil className="fs-m mr-sm" />
          </button>
          <button>
            <MdiArchiveArrowDownOutline className="fs-m mr-sm" />
          </button>
          <button>
            <BiTrash className="fs-m" onClick={() => trashHandler(note)} />
          </button>
        </div>
      </div>
    </div>
  );
}
export { DisplayNote };