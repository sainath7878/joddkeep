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
        case "SET_ARCHIVE":
            return { ...state, archivedNotes: payload }
        case "MOVE_TO_ARCHIVE":
            return { ...state, archivedNotes: payload.archives, notes: payload.notes }
        default:
            return state
    }
}

export { initialNoteState, noteReducer }