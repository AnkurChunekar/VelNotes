import { useState } from "react";
import { toast } from "react-toastify";
import { useTags } from "../../context";
import { capitalizeString } from "../../helpers";
import "./Modals.css";

export function EditTagsModal() {
  const {
    tagsState: { tags },
    tagsDispatch,
    deleteNoteTagService,
  } = useTags();

  const [inputTagName, setInputTagName] = useState("");

  const removeTagHandler = ({ id, tagName }) => {
    deleteNoteTagService(tagName);
    tagsDispatch({ type: "REMOVE_TAG", payload: { id } });
  };

  const AddNewTagClick = () => {
    if (
      !tags.some((item) => item.tagName === inputTagName.trim().toLowerCase())
    ) {
      tagsDispatch({
        type: "ADD_TAG",
        payload: { tagName: inputTagName.trim().toLowerCase() },
      });
      setInputTagName("");
    } else {
      toast.error("Tag already exists");
    }
  };

  return (
    <div className="modal-container label-modal-container flex-center active">
      <div className="modal label-modal m-md1">
        <div className="edit-labels p-md1">
          <span className="fs-4"> Edit Tags </span>

          <div className="input-wrapper input-w-btn m-xs m-rl0">
            <input
              value={inputTagName}
              onChange={(e) => setInputTagName(e.target.value)}
              type="text"
              className="p-xxs"
              placeholder="New Label..."
            />
            <button
              title="Add New Tag"
              disabled={inputTagName.length > 8 || inputTagName.length < 1}
              onClick={AddNewTagClick}
              className="p-xxs btn-unset icon"
            >
              <i className="fas fa-check fs-4" />
            </button>
          </div>

          {inputTagName.length > 8 ? (
            <p className="error-msg">Maximum Length: 8.</p>
          ) : null}

          <ul className="list">
            {tags.map((item) => (
              <li key={item.id} className="flex ai-center jc-space-b">
                <span className="fs-5 fw-600">
                  {capitalizeString(item.tagName)}
                </span>
                <button
                  title="Delete Tag"
                  onClick={() => removeTagHandler(item)}
                  className="p-xs btn-unset icon"
                >
                  <i className="fas fa-times fs-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
        <footer className="p-xs">
          <button
            onClick={() =>
              tagsDispatch({ type: "TOGGLE_TAG_MODAL_VISIBILITY" })
            }
            className="btn btn-secondary"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
