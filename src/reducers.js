import { ADD_TODO, MARK_TODO_DONE, MARK_TODO_NOT_DONE } from "./constants";

const initialState = {
  items: []
};

// Our initial state is the default for the main reducer.
// In order to set up the initial state, an empty action is fired,
// and the "Default" case is called, which initializes the state.
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      // To ensure that the ID is unique, when get the maximum id that already exists,
      // and add 1 to it (see below)
      const maxId = state.items.reduce(
        (maxId, todo) => Math.max(todo.id, maxId),
        -1
      );
      return {
        ...state,
        items: state.items.concat({
          id: maxId + 1,
          done: false,
          text: action.text
        })
      };
    // For the DONE / NOT_DONE actions, we look for a specific todo in our list,
    // and mark that one action as either done or not done.
    case MARK_TODO_DONE:
      return {
        ...state,
        items: state.items.map(item => ({
          id: item.id,
          done: item.id === action.id ? true : item.done,
          text: item.text
        }))
      };
    case MARK_TODO_NOT_DONE:
      return {
        ...state,
        items: state.items.map(item => ({
          id: item.id,
          done: item.id === action.id ? false : item.done,
          text: item.text
        }))
      };
    default:
      return state;
  }
}
