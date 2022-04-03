import { createContext, useContext } from "react"
import { useNotes } from "./notesContext";

const TrashContext = createContext();

function TrashProvider({ children }) {
    const {
        noteState: { trash },
        noteDispatch,
        removeNoteHandler,
        addNewNoteHandler
    } = useNotes();

    const trashHandler = (note) => {
        noteDispatch({ type: "SET_TRASH", payload: [...trash, note] });
        removeNoteHandler(note);
    };

    const removeFromTrashHandler = (note) => {
        const { _id } = note;
        noteDispatch({
            type: "SET_TRASH",
            payload: trash.filter((trashNote) => trashNote._id !== _id),
        });
    };

    const restoreNotesFromTrash = (note) => {
        addNewNoteHandler(note);
        removeFromTrashHandler(note);
    };

    return (
        <TrashContext.Provider value={{ trashHandler, restoreNotesFromTrash, removeFromTrashHandler }}>
            {children}
        </TrashContext.Provider>
    )
}

const useTrash = () => useContext(TrashContext)

export { TrashProvider, useTrash }