import { useContext, createContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useNotes } from "../context";
import { trashReducer, initialTrashState } from "../reducers";

const TrashContext = createContext(initialTrashState);

const TrashProvider = ({ children }) => {
  const [trashState, trashDispatch] = useReducer(
    trashReducer,
    initialTrashState
  );

  const { authState } = useAuth();
  const token = authState.token || localStorage.getItem("token");
  const { notesDispatch } = useNotes();

  // Get Trash
  const getTrashData = async () => {
    try {
      const response = await axios.get(`/api/trash`, {
        headers: { authorization: token },
      });

      if (response.status === 200) {
        trashDispatch({
          type: "UPDATE_TRASH",
          payload: { trash: response.data.trash },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // move to trash
  const moveToTrashService = async (note, setDeleteNoteLoading) => {
    try {
      const response = await axios.post(
        `/api/notes/trash/${note._id}`,
        { note },
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
        toast.success("Moved To Trash!");
      }
    } catch (error) {
      setDeleteNoteLoading(false);
      console.error(error);
    }
  };

  // delete from trash
  const deleteFromTrashService = async (noteId, setDeleteNoteLoading) => {
    try {
      const response = await axios.delete(`/api/trash/delete/${noteId}`, {
        headers: { authorization: token },
      });
      if (response.status === 200) {
        trashDispatch({
          type: "UPDATE_TRASH",
          payload: { trash: response.data.trash },
        });
        toast.success("Note Deleted!");
      }
    } catch (error) {
      setDeleteNoteLoading(false);
      console.error(error);
    }
  };

  // restore from trash
  const restoreFromTrashService = async (note, setDeleteNoteLoading) => {
    try {
      const response = await axios.post(
        `/api/trash/restore/${note._id}`,
        { note },
        {
          headers: { authorization: token },
        }
      );

      if (response.status === 200) {
        trashDispatch({
          type: "UPDATE_TRASH",
          payload: { trash: response.data.trash },
        });
        notesDispatch({
          type: "UPDATE_NOTES",
          payload: { notes: response.data.notes },
        });
        toast.success("Note Restored!");
      }
    } catch (error) {
      setDeleteNoteLoading(false);
      console.error(error);
    }
  };

  const value = {
    trashDispatch,
    trashState,
    getTrashData,
    moveToTrashService,
    deleteFromTrashService,
    restoreFromTrashService,
  };

  return (
    <TrashContext.Provider value={value}>{children}</TrashContext.Provider>
  );
};

const useTrash = () => useContext(TrashContext);

export { useTrash, TrashProvider };
