import "./NoteCard.css";

export function NoteCard() {
  return (
    <div className="note flex flex-column">
      <header className="flex ai-center jc-space-b">
        <h2 className="title fw-600">My Notes</h2>
        <button title="Pin" className="btn-unset">
          <i className="icon fa-solid fa-map-pin" />
        </button>
      </header>
      <p className="content">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda
        quibusdam molestiae, vitae natus, placeat voluptate quisquam voluptatem
        ullam illum quam tempora officia sapiente perspiciatis. Iure alias
        ratione vitae delectus molestiae?natus, placeat voluptate quisquam
        voluptatem ullam illum quam tempora officia sapiente perspiciatis. Iure
        alias ratione vitae delectus molestiae?
      </p>
      <footer className="footer flex ai-center jc-space-b">
        <div className="date">02/04/2020</div>
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
