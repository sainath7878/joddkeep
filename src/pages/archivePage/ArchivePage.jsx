import axios from "axios";
import { Archive } from "components/index";
import { useNotes } from "context";
import { useEffect } from "react";
import "./archivePage.css";

function ArchivePage() {
  const encodedToken = localStorage.getItem("token");
  const {
    noteState: { archivedNotes },
    noteDispatch,
  } = useNotes();

  useEffect(() => {
    (async () => {
      try {
        const response = axios.get("/api/archives", {
          headers: {
            authorization: encodedToken,
          },
        });
        if (response.status === 200) {
          noteDispatch({
            type: "SET_ARCHIVE",
            payload: (await response).data.archives,
          });
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [encodedToken, noteDispatch]);

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
