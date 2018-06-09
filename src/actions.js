import { ADD_TODO, MARK_TODO_DONE, MARK_TODO_NOT_DONE } from "./constants";

export const addTodo = text => ({ type: ADD_TODO, text });
export const markTodoDone = id => ({ type: MARK_TODO_DONE, id });
export const markTodoNotDone = id => ({
  type: MARK_TODO_NOT_DONE,
  id
});
