import { useState } from "react";
import { toast } from "react-toastify";
import { formatDate } from "../../backend/utils/authUtils";
import { RichTextEditor } from "../editor/RichTextEditor";
import { useNotes, useTags } from "../../context";
import { capitalizeString, ifNoteEditNoteDataDiffer } from "../../helpers";
import "./Modals.css";

export function CreateNoteModal({
  setCreateNoteModalVisible,
  editMode = false,
  noteData,
}) {
  const {
    tagsState: { tags },
    tagsDispatch,
  } = useTags();

  const { addNewNoteService, editNoteService } = useNotes();

  const initialInputData = editMode
    ? noteData
    : {
        title: "",
        content: "<p><br></p>",
        isPinned: false,
        color: "",
        tags: [],
        priority: "low",
        date: formatDate(),
      };

  const [inputData, setInputData] = useState(initialInputData);

  const addNewNoteHandler = () => {
    if (inputData.title.trim() !== "") {
      setCreateNoteModalVisible(false);
      if (!editMode) {
        addNewNoteService(inputData);
      } else if (ifNoteEditNoteDataDiffer(noteData, inputData)) {
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
          <div className="modal-title fs-3 fw-600 icon">Create Note</div>
          <button
            onClick={() => setCreateNoteModalVisible(false)}
            id="create-note-close"
            className="btn-unset"
          >
            <i className="fas fa-times fs-4" />
          </button>
        </header>

        <section className="modal-body flex flex-column p-s p-tb0">
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
            className={`content m-xs m-rl0 ${inputData.color}`}
            setValue={(content) =>
              setInputData((data) => ({ ...data, content }))
            }
          />
        </section>

        <section className="options-container flex ai-center jc-space-b flex-wrap p-md1">
          <div>
            <label htmlFor="tag">Tag: </label>
            <select
              value={inputData.tags[0]}
              onChange={(e) =>
                setInputData((data) => ({ ...data, tags: [e.target.value] }))
              }
              name="tag"
              id="tag"
            >
              <option value="">None</option>
              {tags.map(({ id, tagName }) => (
                <option key={id} value={tagName}>
                  {capitalizeString(tagName)}
                </option>
              ))}
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
              <option value="">White</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="yellow">Yellow</option>
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
              tagsDispatch({ type: "TOGGLE_TAG_MODAL_VISIBILITY" });
            }}
            className="btn btn-secondary"
          >
            Add Label
          </button>
          <button onClick={addNewNoteHandler} className="btn btn-primary">
            {editMode ? (
              "Save Note"
            ) : (
              <>
                <i className="fas fa-plus" /> "Create Note"
              </>
            )}
          </button>
        </footer>
      </div>
    </div>
  );
}
