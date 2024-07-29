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
import {ActionReducer, createReducer, on} from "@ngrx/store";
import {Item} from "./todo.model";

export interface State {
  allTodos: Item[];
  todos: Item[];
  filters: Map<keyof Item, Item[keyof Item]>,
  filterValue: string,
  error: string | null
}

export const initialState: State = {
  allTodos: [],
  todos: [],
  filters: new Map<keyof Item, Item[keyof Item]>(),
  filterValue: '',
  error: null
};
export const todoReducer = createReducer(
  initialState,
  on(setTodosSuccess, (state, {todos}) => {
    return {...state, todos: [...todos], allTodos: [...todos]}
  }),
  on(addTodoSuccess, (state, {todo}) => {
    return {...state, todos: [...state.todos, todo], allTodos: [...state.todos]}
  }),
  on(apiError, (state, { error }) => ({
    ...state,
    error
  })),
  on(removeTodoSuccess, (state, {id}) => {
    return {
      ...state,
      todos: [...state.todos.filter(todo => todo.id !== id)],
      allTodos: [...state.todos]
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
    if (value === '') {
      newFilters.delete(column);
    } else {
      newFilters.set(column, value);
    }

    const newArr = state.allTodos.filter((obj) => {
      return Array.from(newFilters.entries()).every(([filterKey, value]) => {
        if (filterKey === "completed") {
          return obj[filterKey] === value;
        }
        return (obj[filterKey] as any).indexOf((value as string).toLocaleLowerCase()) > -1;
      });
    });

    return {
      ...state,
      filters: newFilters,
      todos: [...newArr],
    };
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
