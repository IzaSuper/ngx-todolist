import {createAction, props} from "@ngrx/store";
import {Item} from "./todo.model";
export const setTodos =
  createAction("[TODO] Init", props<{ todos: Item[] }>())
export const addTodo =
  createAction("[TODO] add", props<{ todo: Item }>())
export const removeTodo =
  createAction("[TODO] remove", props<{ id: string }>())
export const completeTodo =
  createAction("[TODO] complete", props<{ id: string, completed: boolean }>())
export const setFilterValues =
  createAction("setFilterValues", props<{ column: keyof Item; value: string | boolean }>())
export const setGlobalFilter =
  createAction("setGlobalFilter", props<{ filterValue: string }>())
export const deleteList =
  createAction("deleteList")
export const editTodo =
  createAction("editTodo", props<{ id: string, title: string, description: string}>())