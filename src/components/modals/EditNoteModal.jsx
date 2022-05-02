import { useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../../backend/utils/authUtils";
import { RichTextEditor } from "../editor/RichTextEditor";
import { useNotes, useTags } from "../../context";
import { ifNoteEditNoteDataDiffer } from "../../helpers";
import "./Modals.css";

export function EditNoteModal({ noteData, setEditNoteModalVisible }) {
  const initialInputData = {
    ...noteData,
    date: formatDate(),
  };

  const [inputData, setInputData] = useState(initialInputData);
  const { editNoteService } = useNotes();
  const { tagsDispatch } = useTags();


  const saveEditedNoteClick = () => {
    if (inputData.title.trim() !== "") {
      setEditNoteModalVisible(false);

      if (ifNoteEditNoteDataDiffer(noteData, inputData)) {
        editNoteService(inputData);
      }
    } else {
      toast.error("Add a Note Title!");
    }
  };

  return (
    <div className="modal-container flex-center active">
      <div className="modal create-note-modal m-md1">
        <header className="p-md1">
          <div className="modal-title fs-3 fw-600 icon">Note</div>
          <button
            onClick={() => setEditNoteModalVisible(false)}
            id="create-note-close"
            className="btn-unset"
          >
            <i className="fas fa-times fs-4" />
          </button>
        </header>

        <section className="modal-body flex flex-column p-md1 p-tb0">
          <input
            type="text"
            placeholder="Title...."
            className="title"
            value={inputData.title}
            onChange={(e) =>
              setInputData((data) => ({ ...data, title: e.target.value }))
            }
          />

          <RichTextEditor
            value={inputData.content}
            setValue={(content) =>
              setInputData((data) => ({ ...data, content }))
            }
          />
        </section>

        <section className="options-container flex ai-center jc-space-b flex-wrap p-md1">
          <div>
            <label htmlFor="priority">Tag: </label>
            <select
              value={inputData.label}
              onChange={(e) =>
                setInputData((data) => ({ ...data, tags: [e.target.value] }))
              }
              name="priority"
              id="priority"
            >
              <option value="work">Work</option>
              <option value="home">Home</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Color: </label>
            <select
              value={inputData.color}
              onChange={(e) =>
                setInputData((data) => ({ ...data, color: e.target.value }))
              }
              name="priority"
              id="priority"
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
            </select>
          </div>

          <div>
            <label htmlFor="priority">Priority: </label>
            <select
              value={inputData.priority}
              onChange={(e) =>
                setInputData((data) => ({ ...data, priority: e.target.value }))
              }
              name="priority"
              id="priority"
            >
              <option value="low">Low</option>
              <option value="high">High</option>
            </select>
          </div>
        </section>

        <footer className="modal-actions p-md1 flex ai-center">
          <button
            onClick={() =>  tagsDispatch({type: "TOGGLE_TAG_MODAL_VISIBILITY"})}
            className="btn btn-secondary"
          >
            Add Tag
          </button>
          <button onClick={saveEditedNoteClick} className="btn btn-primary">
            {" "}
            Save Note
          </button>
        </footer>
      </div>
    </div>
  );
}
