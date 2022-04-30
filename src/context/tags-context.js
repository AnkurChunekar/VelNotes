import { useContext, createContext, useReducer } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useAuth, useNotes, useTrash } from "../context";
import { tagsReducer, initialTagsState } from "../reducers";

const TagsContext = createContext(initialTagsState);

const TagsProvider = ({ children }) => {
  const [tagsState, tagsDispatch] = useReducer(tagsReducer, initialTagsState);
  const value = {
    tagsDispatch,
    tagsState,
  };

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

const useTags = () => useContext(TagsContext);

export { useTags, TagsProvider };
