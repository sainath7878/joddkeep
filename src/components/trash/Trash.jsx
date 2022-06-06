import { IcOutlineNoteAdd, BiTrash } from "assets/icons/Icons";
import { useTrash } from "context";

function Trash({ note }) {
  const { restoreNotesFromTrash, removeFromTrashHandler } = useTrash();

  const { title, color, description, label, priority } = note;

  return (
    <div className="display-notes" style={{ backgroundColor: color }}>
      <div className="display-notes-text">
        <h2 className="fs-m">{title}</h2>
        <p
          className="fs-s"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
      <div className="display-cta">
        <div className="d-flex">
          <h3 className="fs-s labels">{label}</h3>
          <h3 className="fs-s priority">{priority}</h3>
        </div>
        <div className="display-cta-section">
          <button>
            <IcOutlineNoteAdd
              className="fs-m mr-sm"
              onClick={() => restoreNotesFromTrash(note)}
            />
          </button>
          <button>
            <BiTrash
              className="fs-m"
              onClick={() => removeFromTrashHandler(note)}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export { Trash };
