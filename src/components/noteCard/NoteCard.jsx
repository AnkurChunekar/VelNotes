import HtmlParser from "react-html-parser/lib/HtmlParser";
import "./NoteCard.css";

export function NoteCard({ noteData }) {
  const { title, content, date, time } = noteData;

  return (
    <div className="note flex flex-column">
      <header className="flex ai-center jc-space-b">
        <h2 className="title fw-600"> {title} </h2>
        <button title="Pin" className="btn-unset">
          <i className="icon fa-solid fa-map-pin" />
        </button>
      </header>
      <div className="content">{HtmlParser(content)}</div>
      <footer className="footer flex ai-center jc-space-b">
        <div className="date">
          {date} | {time}
        </div>
        <div className="actions">
          <button title="Delete" className="btn-unset">
            <i className="icon fa-solid fa-trash" />
          </button>
          <button title="Edit" className="btn-unset">
            <i className="icon fa-solid fa-pen-to-square" />
          </button>
          <button title="Archive" className="btn-unset">
            <i className="icon fa-solid fa-box-archive" />
          </button>
        </div>
      </footer>
    </div>
  );
}
