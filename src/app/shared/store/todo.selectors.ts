import {createFeatureSelector, createSelector} from "@ngrx/store";
import {State} from "./todo.reducer";

export const selectTodoState =
  createFeatureSelector<State>('todo')

export const selectTodos = createSelector(
  selectTodoState,
  (state: State) => state.todos
)
export const selectAllTodos = createSelector(
  selectTodoState,
  (state: State) => state.allTodos
)
export const selectFilters = createSelector(
  selectTodoState,
  (state: State) => state.filters
)
export const selectGlobalFilterValue = createSelector(
  selectTodoState,
  (state: State) => state.filterValue
);
