import { useState } from "react";
import HtmlParser from "react-html-parser/lib/HtmlParser";
import { useNotes } from "../../context/notes-context";
import { getDateString, getTimeString } from "../../helpers/notesHelpers";
import { EditNoteModal } from "../modals/EditNoteModal";
import "./NoteCard.css";

export function NoteCard({ noteData }) {
  const { title, content, date } = noteData;
  const { toggleNotePinService } = useNotes();
  const [editNoteModalVisible, setEditNoteModalVisible] = useState(false);
  const togglePinClick = () => {
    toggleNotePinService(noteData);
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
        <div className="content" onClick={() => setEditNoteModalVisible(true)}>
          {HtmlParser(content)}
        </div>
        <footer className="footer flex ai-center jc-space-b">
          <div className="date">
            {getDateString(date)} | {getTimeString(date)}
          </div>
          <div className="actions">
            <button title="Move to Trash" className="btn-unset">
              <i className="icon fa-solid fa-trash" />
            </button>
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
