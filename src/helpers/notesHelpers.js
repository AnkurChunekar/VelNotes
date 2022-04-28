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

export { getPinnedUnpinnedNotes, getDateString, getTimeString };
