import { useState } from "react";
import { RichTextEditor } from "../editor/RichTextEditor";
import { useNotes } from "../../context/notes-context";
import "./Modals.css";
import { toast } from "react-toastify";

export function CreateNoteModal({
  setCreateNoteModalVisible,
  setIsLabelModalVisible,
}) {
  const currentDate = new Date();

  const initialInputData = {
    title: "",
    content: "<p><br></p>",
    isPinned: false,
    color: "green",
    tags: [],
    priority: "low",
    date: currentDate.toDateString().slice(4),
    time: currentDate.getHours() + ":" + currentDate.getMinutes(),
  };

  const { addNewNoteService } = useNotes();

  const [inputData, setInputData] = useState(initialInputData);

  const addNewNoteHandler = () => {
    if(inputData.title.trim() !== "") {
      setCreateNoteModalVisible(false);
      addNewNoteService(inputData);
    } else {
      toast.error("Add a Note Title!");
    }
  };

  return (
    <div className="modal-container flex-center active">
      <div className="modal create-note-modal m-md1">
        <header className="p-md1">
          <div className="modal-title fs-3 fw-600 icon">Create Note</div>
          <button
            onClick={() => setCreateNoteModalVisible(false)}
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
            value={inputData.value}
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
            <label htmlFor="priority">Label: </label>
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
            onClick={() => {
              setIsLabelModalVisible(true);
            }}
            className="btn btn-secondary"
          >
            Add Label
          </button>
          <button onClick={addNewNoteHandler} className="btn btn-primary">
            <i className="fas fa-plus" /> Create Note
          </button>
        </footer>
      </div>
    </div>
  );
}
