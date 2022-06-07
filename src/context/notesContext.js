import { useContext, createContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "context/index";
import axios from "axios"
import { initialNoteState, noteReducer } from "reducer/noteReducer";
import { toast } from "react-toastify";


const NotesContext = createContext();

function NotesProvider({ children }) {
    const {
        authState: { isLoggedIn },
    } = useAuth();

    const encodedToken = localStorage.getItem("token");
    const [showEditModal, setShowEditModal] = useState({
        state: false,
        note: {},
    });
    const [noteState, noteDispatch] = useReducer(noteReducer, initialNoteState)


    useEffect(() => {
        if (isLoggedIn) {
            (async () => {
                try {
                    const response = await axios.get("/api/notes", {
                        headers: {
                            authorization: encodedToken,
                        },
                    });
                    if (response.status === 200) {
                        noteDispatch({ type: "SET_NOTES", payload: response.data.notes })
                    }
                } catch (err) {
                    toast.error(err.response.data.errors[0])
                }
            })();
        }
    }, [encodedToken, isLoggedIn]);

    const addNewNoteHandler = async (formDetails, setFormDetails, setDescription) => {
        if (formDetails.label === "") {
            formDetails = { ...formDetails, label: "Home" };
        }
        if (formDetails.priority === "") {
            formDetails = { ...formDetails, priority: "Low" };
        }
        if (formDetails.title !== "" && formDetails.title.trim().length > 0) {
            try {
                const response = await axios.post(
                    "/api/notes",
                    {
                        note: formDetails,
                    },
                    {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                );
                if (response.status === 201) {
                    noteDispatch({ type: "SET_NOTES", payload: response.data.notes });
                    toast.success("Note Added");
                    setFormDetails({
                        title: "",
                        description: "",
                        label: "",
                        priority: "",
                        color: "#fff",
                        isPinned: false,
                    });
                    setDescription(() => "");

                }
            } catch (err) {
                toast.error(err.response.data.errors[0])
            }

        }
        else {
            toast.error("Title cannot be empty");
        }
    };

    const removeNoteHandler = async (note) => {
        const { _id } = note;
        try {
            const response = await axios.delete(`/api/notes/${_id}`,
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            if (response.status === 200) {
                noteDispatch({
                    type: "SET_NOTES",
                    payload: response.data.notes
                });
                toast.info("Moved to Trash");
            }
        }
        catch (err) {
            toast.error(err.response.data.errors[0])
        }
    }

    const pinHandler = async (note) => {
        const { _id, isPinned } = note;
        try {
            const response = await axios.post(`/api/notes/${_id}`,
                { note: { ...note, isPinned: !isPinned } },
                {
                    headers: {
                        authorization: encodedToken
                    }
                }
            )
            if (response.status === 201) {
                noteDispatch({
                    type: "SET_NOTES",
                    payload: response.data.notes
                });
                toast.success("Note Edited");
            }
        }
        catch (err) {
            toast.error(err.response.data.errors[0])
        }
    };

    const updateNoteHandler = async (editDetails) => {
        const { _id } = editDetails;
        if (editDetails.title !== "" && editDetails.title.trim().length > 0) {
            try {
                const response = await axios.post(
                    `/api/notes/${_id}`,
                    { note: editDetails },
                    {
                        headers: {
                            authorization: encodedToken,
                        },
                    }
                );
                if (response.status === 201) {
                    noteDispatch({
                        type: "SET_NOTES",
                        payload: response.data.notes,
                    });
                    toast.success("Note Edited");
                    setShowEditModal({ state: false, note: {} });
                }
            } catch (err) {
                toast.error(err.response.data.errors[0])
            }
        } else {
            toast.error("Title cannot be empty");
        }
    };


    return (
        <NotesContext.Provider value={{ noteState, noteDispatch, addNewNoteHandler, removeNoteHandler, pinHandler, showEditModal, setShowEditModal, updateNoteHandler }}>
            {children}
        </NotesContext.Provider>
    )

}

const useNotes = () => useContext(NotesContext)

export { NotesProvider, useNotes }