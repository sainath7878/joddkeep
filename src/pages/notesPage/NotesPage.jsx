import { NewNote, DisplayNote, EditNote } from "components/index";
import { useNotes } from "context";
import { useDocument } from "customHooks/useDocument";
import "./notesPage.css";

function NotesPage() {
  useDocument("Home");

  const {
    noteState: { notes },
    showEditModal,
  } = useNotes();
  return (
    <section className="notes">
      <NewNote />
      {notes.filter((note) => note.isPinned).length === 0 ? null : (
        <>
          <h2 className="fs-ml">Pinned Notes</h2>
          <div className="display-notes-container">
            {notes.map((note) => {
              if (note.isPinned) {
                return <DisplayNote key={note._id} note={note} />;
              }
              return null;
            })}
          </div>
        </>
      )}
      {notes.filter((note) => !note.isPinned).length === 0 ? null : (
        <>
          <h2 className="fs-ml">Others</h2>
          <div className="display-notes-container">
            {notes.map((note) => {
              if (!note.isPinned) {
                return <DisplayNote key={note._id} note={note} />;
              }
              return null;
            })}
          </div>
        </>
      )}
      {showEditModal.state && <EditNote />}
    </section>
  );
}

export { NotesPage };
