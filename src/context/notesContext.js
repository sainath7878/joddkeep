import { useContext, createContext, useEffect, useReducer } from "react";
import { useAuth } from "context/index";
import axios from "axios"
import { initialNoteState, noteReducer } from "reducer/noteReducer";


const NotesContext = createContext();

function NotesProvider({ children }) {
    const {
        authState: { isLoggedIn },
    } = useAuth();

    const encodedToken = localStorage.getItem("token");
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
            }
        }
        catch (err) {
            console.log(err)
        }


    };


    return (
        <NotesContext.Provider value={{ noteState, noteDispatch, addNewNoteHandler, removeNoteHandler, pinHandler }}>
            {children}
        </NotesContext.Provider>
    )

}

const useNotes = () => useContext(NotesContext)

export { NotesProvider, useNotes }