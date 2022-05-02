import { useContext, createContext, useReducer } from "react";
import axios from "axios";
import { useAuth, useArchive, useNotes, useTrash } from "../context";
import { tagsReducer, initialTagsState } from "../reducers";

const TagsContext = createContext(initialTagsState);

const TagsProvider = ({ children }) => {
  const [tagsState, tagsDispatch] = useReducer(tagsReducer, initialTagsState);
  const { archiveDispatch } = useArchive();
  const { notesDispatch } = useNotes();
  const { trashDispatch } = useTrash();
  const { authState } = useAuth();
  const token = authState.token || localStorage.getItem("token");

  // Delete note tag
  const deleteNoteTagService = async (tagName) => {
    try {
      const response = await axios.post(
        "/api/notes/updatetags",
        { deletedLabel: tagName },
        { headers: { authorization: token } }
      );

      if (response.status === 201) {
        notesDispatch({
          type: "UPDATE_NOTES",
          payload: { notes: response.data.notes },
        });
        trashDispatch({
          type: "UPDATE_TRASH",
          payload: { trash: response.data.trash },
        });
        archiveDispatch({
          type: "UPDATE_ARCHIVE",
          payload: { archive: response.data.archives },
        });
        toast.success("Tag Deleted successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    tagsDispatch,
    tagsState,
    deleteNoteTagService,
  };

  return <TagsContext.Provider value={value}>{children}</TagsContext.Provider>;
};

const useTags = () => useContext(TagsContext);

export { useTags, TagsProvider };
