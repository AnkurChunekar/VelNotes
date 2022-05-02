import { v4 as uuid } from "uuid";
import { deepCloneObject } from "../helpers";

const initialTagsState = {
  tags: [
    { id: uuid(), tagName: "work" },
    { id: uuid(), tagName: "home" },
  ],
  currentTag: "",
  tagsModalVisible: false,
};

const tagsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TAG": {
      const clone = deepCloneObject(state);
      clone.tags.push({ id: uuid(), tagName: action.payload.tagName });
      return clone;
    }
    case "REMOVE_TAG": {
      const clone = deepCloneObject(state);
      clone.tags = clone.tags.filter((tag) => tag.id !== action.payload.id);
      return clone;
    }
    case "TOGGLE_TAG_MODAL_VISIBILITY": {
      const clone = deepCloneObject(state);
      clone.tagsModalVisible = !state.tagsModalVisible;
      return clone;
    }
    default:
      return state;
  }
};

export { tagsReducer, initialTagsState };
