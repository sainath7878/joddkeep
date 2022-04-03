import { Archive } from "components/index";
import { useNotes } from "context";
import "./archivePage.css";

function ArchivePage() {
  const {
    noteState: { archivedNotes },
  } = useNotes();
  return (
    <section className="archive">
      {archivedNotes.length === 0 ? (
        <h1 className="text-align-center fs-l">No Archived Notes</h1>
      ) : (
        <>
          <h1 className="fs-ml mb-sm">Archived Notes</h1>
          <div className="display-notes-container">
            {archivedNotes.map((archiveNote) => (
              <Archive key={archiveNote._id} note={archiveNote} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

export { ArchivePage };
