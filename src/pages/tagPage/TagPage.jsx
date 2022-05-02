import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useNotes } from "../../context";
import { NoteCard } from "../../components";

export function TagPage() {
  const {
    notesState: { notes },
  } = useNotes();

  const { tagName } = useParams();

  return (
    <>
      <section className="notes-section">
        {notes.length > 0 ? (
          <div className="notes-container">
            {notes
              .filter((item) => item.tags.includes(tagName))
              .map((item) => (
                <Fragment key={item._id}>
                  <NoteCard noteData={item} currentPage="notes" />
                </Fragment>
              ))}
          </div>
        ) : (
          <div className="center-align-text fs-4">
            This Tag do not have any Notes.
          </div>
        )}
      </section>
    </>
  );
}
