const initialNoteState = {
    notes: [],
    trash: [],
    archivedNotes: []
}

const noteReducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_NOTES":
            return { ...state, notes: payload }
        case "SET_TRASH":
            return { ...state, trash: payload }
        default:
            return state
    }
}

export { initialNoteState, noteReducer }