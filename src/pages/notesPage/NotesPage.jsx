import { NewNote, DisplayNote } from "components/index";
import "./notesPage.css";

function NotesPage() {
  return (
    <section className="notes">
      <NewNote />
      <h2 className="fs-ml">Pinned Notes</h2>
      <DisplayNote />
      <h2 className="fs-ml">Others</h2>
      <DisplayNote />
    </section>
  );
}

export { NotesPage };
