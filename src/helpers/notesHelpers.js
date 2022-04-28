const getPinnedUnpinnedNotes = (notes) => {
  const pinnedNotes = [];
  const unPinnedNotes = [];

  notes.forEach((note) => {
    note.isPinned ? pinnedNotes.push(note) : unPinnedNotes.push(note);
  });

  return { pinnedNotes, unPinnedNotes };
};

const getDateString = (date) => date.slice(0, 10).replaceAll("-", "/");
const getTimeString = (date) => date.slice(11, 16);

const ifNoteEditNoteDataDiffer = (obj1, obj2) => {
  for (let key of Object.keys(obj1)) {
    if (key !== "date" && obj1[key] !== obj2[key]) return true;
  }
  return false;
};

export { getPinnedUnpinnedNotes, getDateString, getTimeString, ifNoteEditNoteDataDiffer };
