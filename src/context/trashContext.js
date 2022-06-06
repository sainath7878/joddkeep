import { createContext, useContext } from "react"
import { useNotes } from "./index";
import axios from "axios"
import { toast } from "react-toastify";

const TrashContext = createContext();

function TrashProvider({ children }) {
    const {
        noteState: { trash },
        noteDispatch,
        removeNoteHandler,
    } = useNotes();
    const encodedToken = localStorage.getItem("token");

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
        toast.info("Removed from Trash");
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
                toast.success("Added to Notes");
            };

        } catch (err) {
            toast.error(err.response.data.errors[0]);
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