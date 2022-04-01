const initialNoteState = {
    notes: [],
    trash: [],
    archivedNotes: []
}

const noteReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_INITIAL_NOTES":
            return { ...state, notes: payload }
        case "ADD_NEW_NOTE":
            return { ...state, notes: payload }
        case "ADD_NOTE_TO_TRASH":
            return { ...state, trash: payload }
        case "REMOVE_NOTE_FROM_NOTES":
            return { ...state, notes: payload }
        case "TOGGLE_PINNED_NOTES":
            return { ...state, notes: payload }
        case "REMOVE_FROM_TRASH":
            return { ...state, trash: payload }
        default:
            return state
    }
}

export { initialNoteState, noteReducer }