import { Fragment, useEffect } from "react";
import { useTrash } from "../../context";
import { NoteCard } from "../../components";

export function Trash() {
  const {
    trashState: { trash },
    getTrashData,
  } = useTrash();

  useEffect(() => {
    getTrashData();
  }, []);

  return (
    <>
      <section className="notes-section">
        {trash.length > 0 ? (
          <div className="notes-container">
            {trash.map((item) => (
              <Fragment key={item._id}>
                <NoteCard noteData={item} currentPage="trash" />
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="center-align-text fs-4"> Trash is Empty. </div>
        )}
      </section>
    </>
  );
}
