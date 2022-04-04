import { createContext, useContext } from "react"
import { useAuth, useNotes } from "./index";
import axios from "axios"

const TrashContext = createContext();

function TrashProvider({ children }) {
    const {
        noteState: { trash },
        noteDispatch,
        removeNoteHandler,
    } = useNotes();
    const { authDispatch } = useAuth();
    const encodedToken = localStorage.getItem("token");

    const trashHandler = (note) => {
        noteDispatch({ type: "SET_TRASH", payload: [...trash, note] });
        removeNoteHandler(note);
        authDispatch({ type: "SET_TOAST", payload: { type: "snackbar-danger", msg: "Moved to Trash", toastState: true } });
    };

    const removeFromTrashHandler = (note) => {
        const { _id } = note;
        noteDispatch({
            type: "SET_TRASH",
            payload: trash.filter((trashNote) => trashNote._id !== _id),
        });
        authDispatch({ type: "SET_TOAST", payload: { type: "snackbar-danger", msg: "Removed from Trash", toastState: true } });
    };

    const restoreNotesFromTrash = async (note) => {
        const { _id } = note;
        try {
            const response = await axios.post(
                "/api/notes",
                {
                    note,
                },
                {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            );
            if (response.status === 201) {
                noteDispatch({ type: "SET_NOTES", payload: response.data.notes });
                noteDispatch({
                    type: "SET_TRASH",
                    payload: trash.filter((trashNote) => trashNote._id !== _id),
                });
                authDispatch({ type: "SET_TOAST", payload: { type: "snackbar-success", msg: "Added to notes", toastState: true } });
            };

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <TrashContext.Provider value={{ trashHandler, restoreNotesFromTrash, removeFromTrashHandler }}>
            {children}
        </TrashContext.Provider>
    )
}

const useTrash = () => useContext(TrashContext)

export { TrashProvider, useTrash }