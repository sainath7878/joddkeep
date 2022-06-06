import { createContext, useContext } from "react"
import axios from "axios";
import { useNotes } from "./index";
import { useTrash } from "./trashContext";
import { toast } from "react-toastify";

const ArchiveContext = createContext();

function ArchiveProvider({ children }) {

    const encodedToken = localStorage.getItem("token");
    const { noteDispatch } = useNotes();
    const { trashHandler } = useTrash();

    const archiveHandler = async (note) => {
        const { _id } = note;
        try {
            const response = await axios.post(
                `/api/notes/archives/${_id}`,
                {
                    note
                },
                {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            );
            if (response.status === 201) {
                noteDispatch({ type: "MOVE_TO_ARCHIVE", payload: { notes: response.data.notes, archives: response.data.archives } })
                toast.success("Archived Notes")
            }
        } catch (err) {
            toast.error(err.response.data.errors[0])
        }
    };

    const unarchiveHandler = async (note) => {
        const { _id } = note;
        try {
            const response = await axios.post(
                `/api/archives/restore/${_id}`,
                {},
                {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            );
            if (response.status === 200) {
                noteDispatch({ type: "MOVE_TO_ARCHIVE", payload: { notes: response.data.notes, archives: response.data.archives } })
                toast.success("Moved to Notes");
            }
        } catch (err) {
            toast.error(err.response.data.errors[0])
        }
    }

    const deleteFromArchiveHandler = async (note) => {
        const { _id } = note;
        try {
            const response = await axios.delete(
                `/api/archives/delete/${_id}`,
                {
                    headers: {
                        authorization: encodedToken,
                    },
                }
            );
            if (response.status === 200) {
                noteDispatch({ type: "SET_ARCHIVE", payload: response.data.archives })
                trashHandler(note);
                toast.info("Moved to Trash");
            }
        } catch (err) {
            toast.error(err.response.data.errors[0])
        }
    }

    return (
        <ArchiveContext.Provider value={{ archiveHandler, unarchiveHandler, deleteFromArchiveHandler }}>
            {children}
        </ArchiveContext.Provider>
    )
}

const useArchive = () => useContext(ArchiveContext)

export { ArchiveProvider, useArchive }