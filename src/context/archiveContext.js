import { createContext, useContext } from "react"
import axios from "axios";
import { useNotes } from "./notesContext";
import { useTrash } from "./trashContext";

const ArchiveContext = createContext();

function ArchiveProvider({ children }) {

    const encodedToken = localStorage.getItem("token");
    const { noteDispatch } = useNotes();
    const { trashHandler } = useTrash()

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
            }
        } catch (err) {
            console.log(err);
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
            }
        } catch (err) {
            console.log(err);
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
            }
        } catch (err) {
            console.log(err);
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