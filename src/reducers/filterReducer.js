const initialFilterState = {
  priority: null,
  sortByDate: null,
  tags: [],
  searchValue: "",
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_PRIORITY":
      return {
        ...state,
        tags: [...state.tags],
        priority: action.payload.priority,
      };
    case "UPDATE_SORT_BY_DATE":
      return {
        ...state,
        tags: [...state.tags],
        sortByDate: action.payload.sortByDate,
      };
    case "UPDATE_SEARCH_VALUE":
      return {
        ...initialFilterState,
        searchValue: action.payload.searchValue,
      };
    case "TOGGLE_TAG":
      return {
        ...state,
        tags: state.tags.includes(action.payload.tagName)
          ? state.tags.filter((item) => item !== action.payload.tagName)
          : [...state.tags, action.payload.tagName],
      };
      case "RESET":
      return initialFilterState;
    default:
      return state;
  }
};

export { filterReducer, initialFilterState };
