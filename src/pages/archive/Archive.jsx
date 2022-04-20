import { NoteCard } from "../../components";

export function Archive() {
  return (
    <>
      <section className="notes-section">
        <h2 className="fw-400 fs-5 m-xs m-rl0 gray-text">Pinned Notes.</h2>
        <div className="notes-container">
          <NoteCard />
        </div>
      </section>
    </>
  );
}
