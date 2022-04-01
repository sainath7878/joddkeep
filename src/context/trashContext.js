import { createContext, useContext } from "react"
import { useNotes } from "./notesContext";

const TrashContext = createContext();

function TrashProvider({ children }) {
    const {
        noteState: { trash },
        noteDispatch,
        removeNoteHandler
    } = useNotes();

    const trashHandler = (note) => {
        noteDispatch({ type: "SET_TRASH", payload: [...trash, note] });
        removeNoteHandler(note);
    };

    return (
        <TrashContext.Provider value={{ trashHandler }}>
            {children}
        </TrashContext.Provider>
    )
}

const useTrash = () => useContext(TrashContext)

export { TrashProvider, useTrash }