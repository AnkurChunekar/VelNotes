import { useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { useArchive, useNotes, useTrash } from "../../context";
import { getDateString, getTimeString } from "../../helpers/notesHelpers";
import { CreateNoteModal } from "../modals/CreateNoteModal";
import "./NoteCard.css";

export function NoteCard({ noteData, currentPage = "notes" }) {
  const { title, content, date } = noteData;
  const { toggleNotePinService } = useNotes();
  const {
    moveToArchiveService,
    moveArchiveToTrashService,
    restoreFromArchiveService,
  } = useArchive();
  const {
    moveToTrashService,
    deleteFromTrashService,
    restoreFromTrashService,
  } = useTrash();
  const [createNoteModalVisible, setCreateNoteModalVisible] = useState(false);
  const [isDeleteNoteLoading, setDeleteNoteLoading] = useState(false);
  const [isArchiveNoteLoading, setArchiveNoteLoading] = useState(false);

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
      case "archive":
        moveArchiveToTrashService(noteData);
        break;
      default:
        moveToTrashService(noteData, setDeleteNoteLoading);
    }
  };

  const restoreNoteClick = () => {
    restoreFromTrashService(noteData, setDeleteNoteLoading);
  };

  // Archive handlers
  const moveToArchiveClick = () => {
    moveToArchiveService(noteData, setArchiveNoteLoading);
  };

  return (
    <>
      <div className={`note flex flex-column ${noteData.color}`}>
        <header className="flex ai-center">
          <h2 className="title fw-600"> {title} </h2>
          <span className="priority m-left-auto">
            {noteData.priority === "low" ? "LOW" : "HIGH"}
          </span>
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
            currentPage !== "trash" && setCreateNoteModalVisible(true)
          }
        >
          {HtmlParser(content)}
        </div>

        <div className="tag-container flex c-gap-1rem flex-wrap">
          {noteData.tags.map((item) => (
            <div key={item} className="tag">
              {item}
            </div>
          ))}
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
                  onClick={moveToArchiveClick}
                  disabled={isArchiveNoteLoading}
                  title="Archive"
                  className="btn-unset"
                >
                  <i className="icon fa-solid fa-box-archive" />
                </button>
              </>
            ) : null}

            {currentPage === "archive" ? (
              <button
                onClick={() => restoreFromArchiveService(noteData)}
                title="Unarchive"
                className="btn-unset"
              >
                <i className="icon fa-solid fa-folder-minus"></i>
              </button>
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

      {createNoteModalVisible ? (
        <CreateNoteModal
          noteData={noteData}
          setCreateNoteModalVisible={setCreateNoteModalVisible}
          editMode={true}
        />
      ) : null}
    </>
  );
}
