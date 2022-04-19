import "./Modals.css";

export function CreateNoteModal({ setCreateNoteModalVisible }) {
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
          <input type="text" placeholder="Title...." className="title" />
          <textarea
            placeholder="Note Content Here.."
            className="content m-xs m-rl0"
            defaultValue=""
          />
        </section>
        <section className="options-container flex ai-center jc-space-b flex-wrap p-md1">
          <div>
            <label htmlFor="priority">Label: </label>
            <select name="priority" id="priority">
              <option value="work">Work</option>
              <option value="home">Home</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority">Color: </label>
            <select name="priority" id="priority">
              <option value="red">Red</option>
              <option value="green">Green</option>
            </select>
          </div>
          <div>
            <label htmlFor="priority">Priority: </label>
            <select name="priority" id="priority">
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
        </section>
        <footer className="modal-actions p-md1">
          <button className="btn btn-primary">
            <i className="fas fa-plus" /> Create Note
          </button>
        </footer>
      </div>
    </div>
  );
}
