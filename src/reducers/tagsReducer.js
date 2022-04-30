import { v4 as uuid } from "uuid";
import { deepCloneObject } from "../helpers";

const initialTagsState = {
  tags: [
    { id: uuid(), tagName: "work" },
    { id: uuid(), tagName: "home" },
  ],
  currentTag: "",
};

const cloneStateAndAddTag = (state, tagName) => {
  const clone = deepCloneObject(state);
  clone.tags.push({id: uuid(), tagName: tagName});
  return clone;
}

const cloneStateAndRemoveTag = (state, tagId) => {
  const clone = deepCloneObject(state);
  clone.tags = clone.tags.filter(tag => tag.id !== tagId);
  return clone;
}

const tagsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG":
      return cloneStateAndAddTag(state, action.payload.tagName);
    case "REMOVE_TAG":
      return cloneStateAndRemoveTag(state, action.payload.id);
    default:
      return state;
  }
};

export { tagsReducer, initialTagsState };
