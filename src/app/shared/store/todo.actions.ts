import {createAction, props} from "@ngrx/store";
import {Item} from "./todo.model";

export const apiError =
  createAction("[TODO] error", props<{error: any}>())
export const setTodos =
  createAction("[TODO] init")
export const setTodosSuccess =
  createAction("[TODO] init success", props<{ todos: Item[] }>())
export const addTodo =
  createAction("[TODO] add", props<{ todo: Item }>())
export const addTodoSuccess =
  createAction("[TODO] add success", props<{ todo: Item }>())
export const removeTodo =
  createAction("[TODO] remove", props<{ id: string }>())
export const removeTodoSuccess =
  createAction("[TODO] remove success", props<{ id: string }>())
export const completeTodo =
  createAction("[TODO] complete", props<{ todo: Item }>())
export const completeTodoSuccess =
  createAction("[TODO] complete success", props<{ todo: Item }>())
export const editTodo =
  createAction("editTodo", props<{ todo: Item }>())
export const editTodoSuccess =
  createAction("editTodo success", props<{ todo: Item }>())
export const setFilterValues =
  createAction("setFilterValues", props<{ column: keyof Item; value: string | boolean }>())
export const setGlobalFilter =
  createAction("setGlobalFilter", props<{ filterValue: string }>())
