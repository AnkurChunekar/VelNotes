const initialNotesState = { notes: [] };

const notesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NOTES":
      return { notes: action.payload.notes };
    default:
      return state;
  }
};

export { notesReducer, initialNotesState };
