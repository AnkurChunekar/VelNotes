const initialTrashState = { trash: [] };

const trashReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TRASH":
      return { trash: action.payload.trash };
    default:
      return state;
  }
};

export { trashReducer, initialTrashState };
