import { Trash } from "components/index";
import { useNotes } from "context";
import "./trashPage.css";

function TrashPage() {
  const {
    noteState: { trash },
  } = useNotes();
  return (
    <section className="trash">
      {trash.length === 0 ? (
        <h1 className="text-align-center fs-l">No Trashed Notes</h1>
      ) : (
        <>
          <h1 className="fs-ml mb-sm">Trashed Notes</h1>
          <div className="display-notes-container">
            {trash.map((trashNote) => (
              <Trash key={trashNote._id} note={trashNote} />
            ))}
            
          </div>
        </>
      )}
    </section>
  );
}

export { TrashPage };
