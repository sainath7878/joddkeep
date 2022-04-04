import {
  BiPin,
  BiPinFill,
  BiTrash,
  BiPencil,
  MdiArchiveArrowDownOutline,
} from "assets/icons/Icons";
import { useArchive, useNotes, useTrash } from "context";
import "./displayNote.css";

function DisplayNote({ note }) {
  const { title, color, description, label, priority, isPinned } = note;
  const { pinHandler, setShowEditModal } = useNotes();

  const { trashHandler } = useTrash();
  const { archiveHandler } = useArchive();

  return (
    <>
      <div className="display-notes" style={{ backgroundColor: color }}>
        <button
          className="btn-pin"
          type="button"
          onClick={() => pinHandler(note)}
        >
          {isPinned ? (
            <BiPinFill className="fs-m" />
          ) : (
            <BiPin className="fs-m" />
          )}
        </button>

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
              <BiPencil
                className="fs-m mr-sm"
                onClick={() => {
                  setShowEditModal({ state: true, note: note });
                }}
              />
            </button>
            <button>
              <MdiArchiveArrowDownOutline
                className="fs-m mr-sm"
                onClick={() => archiveHandler(note)}
              />
            </button>
            <button>
              <BiTrash className="fs-m" onClick={() => trashHandler(note)} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export { DisplayNote };
