import { NoteCard } from "../../components";

export function Trash() {
  return (
    <>
      <section className="notes-section">
        <div className="notes-container">
          <NoteCard />
          <NoteCard />
        </div>
      </section>
    </>
  );
}
