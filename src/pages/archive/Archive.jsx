import { useEffect, Fragment } from "react";
import { useArchive } from "../../context";
import { NoteCard } from "../../components";

export function Archive() {
  const {
    archiveState: { archive },
    getArchiveData,
  } = useArchive();

  useEffect(() => {
    getArchiveData();
  }, []);

  return (
    <>
      <section className="notes-section">
        {archive.length > 0 ? (
          <div className="notes-container">
            {archive.map((item) => (
              <Fragment key={item._id}>
                <NoteCard noteData={item} currentPage="archive" />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="center-align-text fs-4"> Archive is Empty. </div>
        )}
      </section>
    </>
  );
}
