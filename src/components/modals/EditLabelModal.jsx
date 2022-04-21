import "./Modals.css";

export function EditLabelModal({ setIsLabelModalVisible }) {
  return (
    <div className="modal-container flex-center active">
      <div className="modal label-modal m-md1">
        <div className="edit-labels p-md1">
          <span className="fs-4"> Edit Labels </span>
          <div className="input-wrapper input-w-btn m-xs m-rl0">
            <input type="text" className="p-xxs" placeholder="New Label..." />
            <button className="p-xxs btn-unset icon">
              <i className="fas fa-check fs-4" />
            </button>
          </div>
          <ul className="list">
            <li className="flex ai-center jc-space-b">
              <span className="fs-5 fw-600"> Work</span>
              <button className="p-xs btn-unset icon">
                <i className="fas fa-times fs-4" />
              </button>
            </li>
            <li className="flex ai-center jc-space-b">
              <span className="fs-5 fw-600">Study</span>
              <button className="p-xs btn-unset icon">
                <i className="fas fa-times fs-4" />
              </button>
            </li>
            <li className="flex ai-center jc-space-b">
              <span className="fs-5 fw-600">Travel</span>
              <button className="p-xs btn-unset icon">
                <i className="fas fa-times fs-4" />
              </button>
            </li>
          </ul>
        </div>
        <footer className="p-xs">
          <button
            onClick={() => setIsLabelModalVisible(false)}
            className="btn btn-secondary"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
