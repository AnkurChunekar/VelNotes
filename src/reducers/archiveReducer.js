const initialArchiveState = { archive: [] };

const archiveReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_ARCHIVE":
      return { archive: action.payload.archive };
    default:
      return state;
  }
};

export { archiveReducer, initialArchiveState };
