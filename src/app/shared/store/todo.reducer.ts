import {
  addTodoSuccess,
  apiError,
  setTodosSuccess,
  completeTodoSuccess,
  editTodoSuccess,
  removeTodoSuccess,
  setFilterValues,
  setGlobalFilter
} from './todo.actions';
import {Action, ActionReducer, createReducer, MetaReducer, on} from "@ngrx/store";
import {Item} from "./todo.model";

export interface State {
  todos: Item[];
  filters: Map<keyof Item, Item[keyof Item]>,
  filterValue: string,
  error: string | null
}

export const initialState: State = {
  todos: [],
  filters: new Map<keyof Item, Item[keyof Item]>(),
  filterValue: '',
  error: null
};
export const todoReducer = createReducer(
  initialState,
  on(setTodosSuccess, (state, {todos}) => {
    return {...state, todos: [...todos]}
  }),
  on(addTodoSuccess, (state, {todo}) => {
    return {...state, todos: [...state.todos, todo]}
  }),
  on(apiError, (state, { error }) => ({
    ...state,
    error
  })),
  on(removeTodoSuccess, (state, {id}) => {
    return {...state,
      todos: [...state.todos.filter(todo => todo.id !== id)]
    }
  }),
  on(completeTodoSuccess, (state, {todo}) => {
    return {
      ...state,
      todos: [...state.todos.map(item =>
      item.id === todo.id ? {...item, completed: todo.completed} : item)]
    }
  }),
  on(editTodoSuccess, (state, {todo}) => {
    return {
      ...state,
      todos: state.todos.map(item =>
        item.id === todo.id ? {...item, title: todo.title, description: todo.description} : item
      )
    }
  }),
  on(setFilterValues, (state, {column, value}) => {
    const newFilters = new Map(state.filters);
    newFilters.set(column, value);
    return {...state, filters: newFilters};
  }),
  on(setGlobalFilter, (state, {filterValue}) => {
    return {
      ...state, filterValue: filterValue
    }
  })
)

export function loggerMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    console.groupCollapsed(action.type);
    console.log('prev state', state);

    const newState = reducer(state, action);

    console.log('next state', newState);
    console.groupEnd();

    return newState;
  };
}
