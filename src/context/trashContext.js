import { createContext, useContext } from "react"
import { useNotes } from "./notesContext";

const TrashContext = createContext();

function TrashProvider({ children }) {
    const {
        noteState: { notes, trash },
        noteDispatch,
        removeNoteHandler
    } = useNotes();

    const trashHandler = (note) => {
        const { _id } = note;
        noteDispatch({ type: "ADD_NOTE_TO_TRASH", payload: [...trash, note] });
        removeNoteHandler(note);
        noteDispatch({
            type: "REMOVE_NOTE_FROM_NOTES",
            payload: notes.filter((stateNote) => stateNote._id !== _id),
        });
    };

    return (
        <TrashContext.Provider value={{ trashHandler }}>
            {children}
        </TrashContext.Provider>
    )
}

const useTrash = () => useContext(TrashContext)

export { TrashProvider, useTrash }