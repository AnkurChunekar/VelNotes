import { useContext, createContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useNotes, useTrash } from "../context";
import { archiveReducer, initialArchiveState } from "../reducers";

const ArchiveContext = createContext(initialArchiveState);

const ArchiveProvider = ({ children }) => {
  const [archiveState, archiveDispatch] = useReducer(
    archiveReducer,
    initialArchiveState
  );

  const { authState } = useAuth();
  const token = authState.token || localStorage.getItem("token");
  const { notesDispatch } = useNotes();
  const { trashDispatch } = useTrash();

  // Get Archive
  const getArchiveData = async () => {
    try {
      const response = await axios.get(`/api/archives`, {
        headers: { authorization: token },
      });

      if (response.status === 200) {
        archiveDispatch({
          type: "UPDATE_ARCHIVE",
          payload: { archive: response.data.archives },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // move to archive
  const moveToArchiveService = async (note, setLoading = () => {}) => {
    try {
      const response = await axios.post(
        `/api/notes/archives/${note._id}`,
        { note },
        { headers: { authorization: token } }
      );

      if (response.status === 201) {
        notesDispatch({
          type: "UPDATE_NOTES",
          payload: { notes: response.data.notes },
        });

        archiveDispatch({
          type: "UPDATE_ARCHIVE",
          payload: { archive: response.data.archives },
        });

        toast.success("Note Archived!");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  // move to archive -> trash
  const moveArchiveToTrashService = async (note, setLoading = () => {}) => {
    try {
      const response = await axios.post(
        `/api/archives/trash/${note._id}`,
        { note },
        { headers: { authorization: token } }
      );

      if (response.status === 201) {
        trashDispatch({
          type: "UPDATE_TRASH",
          payload: { trash: response.data.trash },
        });

        archiveDispatch({
          type: "UPDATE_ARCHIVE",
          payload: { archive: response.data.archives },
        });

        toast.success("Note Trashed!");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const value = {
    archiveDispatch,
    archiveState,
    getArchiveData,
    moveToArchiveService,
    moveArchiveToTrashService,
  };

  return (
    <ArchiveContext.Provider value={value}>{children}</ArchiveContext.Provider>
  );
};

const useArchive = () => useContext(ArchiveContext);

export { useArchive, ArchiveProvider };
