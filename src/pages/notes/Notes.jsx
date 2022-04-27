import { Fragment } from "react";
import { useNotes } from "../../context";
import { NoteCard } from "../../components";
import { getPinnedUnpinnedNotes } from "../../helpers";

export function Notes() {
  const {
    notesState: { notes },
  } = useNotes();

  const { pinnedNotes, unPinnedNotes } = getPinnedUnpinnedNotes(notes);

  return (
    <>
      {pinnedNotes.length > 0 ? (
        <section className="notes-section">
          <h2 className="fw-400 fs-5 m-xs m-rl0 gray-text">Pinned Notes.</h2>
          <div className="notes-container">
            {pinnedNotes.map((item) => (
              <Fragment key={item._id}>
                <NoteCard noteData={item} />
              </Fragment>
            ))}
          </div>
        </section>
      ) : null}

      {/* Unpinned Notes */}

      <section className="notes-section">
        {unPinnedNotes.length > 0 ? (
          <>
            <h2 className="fw-400 fs-5 m-xs m-rl0 gray-text">All Notes.</h2>
            <div className="notes-container">
              {unPinnedNotes.map((item) => (
                <Fragment key={item._id}>
                  <NoteCard noteData={item} />
                </Fragment>
              ))}
            </div>
          </>
        ) : (
          <div className="center-align-text fs-4">
            You Haven't added any notes yet.
          </div>
        )}
      </section>
    </>
  );
}
