const getPinnedUnpinnedNotes = (notes) => {
  const pinnedNotes = [];
  const unPinnedNotes = [];

  notes.forEach((note) => {
    note.isPinned ? pinnedNotes.push(note) : unPinnedNotes.push(note);
  });

  return { pinnedNotes, unPinnedNotes };
};

export { getPinnedUnpinnedNotes };
