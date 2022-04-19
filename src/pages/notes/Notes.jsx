import { NoteCard } from "../../components";

export function Notes() {
  return (
    <>
      <section className="notes-section">
        <h2 className="fw-400 fs-5 m-xs m-rl0 gray-text">Pinned Notes.</h2>
        <div className="notes-container">
          <NoteCard />
          <NoteCard />
          <NoteCard />
        </div>
      </section>
      {/* Unpiined Notes */}
      <section className="notes-section">
        <h2 className="fw-400 fs-5 m-xs m-rl0 gray-text">All Notes.</h2>
        <div className="notes-container">
          <NoteCard />
          <NoteCard />
        </div>
      </section>
    </>
  );
}
