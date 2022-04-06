import { useContext, createContext, useEffect, useReducer, useState } from "react";
import { useAuth } from "context/index";
import axios from "axios"
import { initialNoteState, noteReducer } from "reducer/noteReducer";


const NotesContext = createContext();

function NotesProvider({ children }) {
    const {
        authState: { isLoggedIn }, authDispatch
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
                    console.log(err);
                }
            })();
        }
    }, [encodedToken, isLoggedIn]);

    const addNewNoteHandler = async (formDetails, setFormDetails) => {
        if (formDetails.label === "") {
            formDetails = { ...formDetails, label: "Home" };
        }
        if (formDetails.priority === "") {
            formDetails = { ...formDetails, priority: "Low" };
        }
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
                authDispatch({ type: "SET_TOAST", payload: { type: "snackbar-success", msg: "Notes Added", toastState: true } });
            }
        } catch (err) {
            console.log(err);
        }
        setFormDetails({
            title: "",
            description: "",
            label: "",
            priority: "",
            color: "#fff",
            isPinned: false,
        });
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
                authDispatch({ type: "SET_TOAST", payload: { type: "snackbar-danger", msg: "Moved to Trash", toastState: true } });
            }
        }
        catch (err) {
            console.log(err)
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
                authDispatch({ type: "SET_TOAST", payload: { type: "snackbar-info", msg: "Note Edited", toastState: true } });
            }
        }
        catch (err) {
            console.log(err)
        }
    };

    const updateNoteHandler = async (editDetails) => {
        const { _id } = editDetails;
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
                authDispatch({
                    type: "SET_TOAST",
                    payload: {
                        type: "snackbar-info",
                        msg: "Note Edited",
                        toastState: true,
                    },
                });
                setShowEditModal({ state: false, note: {} });
            }
        } catch (err) {
            console.log(err);
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