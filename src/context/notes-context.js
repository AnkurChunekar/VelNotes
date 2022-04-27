import { useContext, createContext, useReducer } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "./auth-context";
import { notesReducer, initialNotesState } from "../reducers";

const NotesContext = createContext(initialNotesState);

const NotesProvider = ({ children }) => {
  const [notesState, notesDispatch] = useReducer(
    notesReducer,
    initialNotesState
  );

  const { authState } = useAuth();

  const token = authState.token || localStorage.getItem("token");

  const addNewNoteService = async (note) => {
    try {
      const response = await axios.post(
        "/api/notes",
        { note },
        { headers: { authorization: token } }
      );
      if (response.status === 201) {
        notesDispatch({
          type: "UPDATE_NOTES",
          payload: { notes: response.data.notes },
        });
        toast.success("Note added successfully.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNotesService = async (note) => {
    try {
      const response = await axios.get("/api/notes", {
        headers: { authorization: token },
      });
      console.log(response);
      // if (response.status === 201) {
      //   // notesDispatch({
      //   //   type: "UPDATE_NOTES",
      //   //   payload: { notesList: data.notes },
      //   // });
      //   toast.success("Note added successfully.");
      // }
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    notesState,
    notesDispatch,
    addNewNoteService,
  };

  return (
    <NotesContext.Provider value={value}>{children}</NotesContext.Provider>
  );
};

const useNotes = () => useContext(NotesContext);

export { useNotes, NotesProvider };
