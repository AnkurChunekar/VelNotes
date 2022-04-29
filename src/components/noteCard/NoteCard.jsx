import { useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { useNotes, useTrash } from "../../context";
import { getDateString, getTimeString } from "../../helpers/notesHelpers";
import { EditNoteModal } from "../modals/EditNoteModal";
import "./NoteCard.css";

export function NoteCard({ noteData, currentPage = "notes" }) {
  const { title, content, date } = noteData;
  const { toggleNotePinService } = useNotes();
  const {
    moveToTrashService,
    deleteFromTrashService,
    restoreFromTrashService,
  } = useTrash();
  const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
  const [isDeleteNoteLoading, setDeleteNoteLoading] = useState(false);

  const togglePinClick = () => {
    toggleNotePinService(noteData);
  };

  const moveToTrashClick = () => {
    setDeleteNoteLoading(true);
    switch (currentPage) {
      case "notes":
        moveToTrashService(noteData, setDeleteNoteLoading);
        break;
      case "trash":
        deleteFromTrashService(noteData._id, setDeleteNoteLoading);
        break;
      default:
        moveToTrashService(noteData, setDeleteNoteLoading);
    }
  };

  const restoreNoteClick = () => {
    restoreFromTrashService(noteData, setDeleteNoteLoading);
  };

  return (
    <>
      <div className="note flex flex-column">
        <header className="flex ai-center jc-space-b">
          <h2 className="title fw-600"> {title} </h2>
          <button onClick={togglePinClick} title="Pin" className="btn-unset">
            <i
              className={`icon fa-solid fa-map-pin ${
                noteData.isPinned ? "active" : ""
              }`}
            />
          </button>
        </header>
        <div
          className="content"
          onClick={() =>
            currentPage !== "trash" && setEditNoteModalVisible(true)
          }
        >
          {HtmlParser(content)}
        </div>
        <footer className="footer flex ai-center jc-space-b">
          <div className="date">
            {getDateString(date)} | {getTimeString(date)}
          </div>
          <div className="actions">
            <button
              disabled={isDeleteNoteLoading ? true : false}
              onClick={moveToTrashClick}
              title="Delete"
              className="btn-unset"
            >
              <i className="icon fa-solid fa-trash" />
            </button>

            {currentPage === "notes" ? (
              <>
                <button
                  onClick={() => setEditNoteModalVisible(true)}
                  title="Edit"
                  className="btn-unset"
                >
                  <i className="icon fa-solid fa-pen-to-square" />
                </button>
                <button title="Archive" className="btn-unset">
                  <i className="icon fa-solid fa-box-archive" />
                </button>
              </>
            ) : null}

            {currentPage === "trash" && (
              <button
                disabled={isDeleteNoteLoading ? true : false}
                onClick={restoreNoteClick}
                title="Restore"
                className="btn-unset"
              >
                <i className="icon fa-solid fa-trash-arrow-up" />
              </button>
            )}
          </div>
        </footer>
      </div>
      {editNoteModalVisible ? (
        <EditNoteModal
          noteData={noteData}
          setEditNoteModalVisible={setEditNoteModalVisible}
        />
      ) : null}
    </>
  );
}
