const filterByTags = (data, filterState) => {
  if (filterState.tags.length < 1) return data;

  return data.filter((note) => {
    for (let tag of note.tags) {
      if (filterState.tags.includes(tag)) return true;
    }
  });
};

const sortByPriority = (data, filterState) => {
  if (filterState.priority === null) return data;

  const lowPriorityData = [];
  const highPriorityData = [];

  for (let note of data) {
    if (note.priority === "low") {
      lowPriorityData.push(note);
    } else {
      highPriorityData.push(note);
    }
  }

  return filterState.priority === "low-to-high"
    ? lowPriorityData.concat(highPriorityData)
    : highPriorityData.concat(lowPriorityData);
};

const sortByDate = (data, filterState) => {
  if (filterState.sortByDate === null) return data;

  if (filterState.sortByDate === "oldest-first") {
    return [...data].sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  } else {
    return [...data].sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  }
};

const filterBySearch = (data, filterState) => {
  const searchValue = filterState.searchValue.trim().toLowerCase();

  return data.filter((item) => item.title.toLowerCase().includes(searchValue));
};

export const getFilteredData = (data, filterState) => {
  if (filterState.searchValue.trim() !== "") {
    return filterBySearch(data, filterState);
  }

  const tagFilteredData = filterByTags(data, filterState);
  const prioritySortedData = sortByPriority(tagFilteredData, filterState);
  const dateSortedData = sortByDate(prioritySortedData, filterState);
  return dateSortedData;
};
