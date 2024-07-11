import {
  addTodo,
  completeTodo,
  deleteList,
  editTodo,
  removeTodo,
  setFilterValues,
  setGlobalFilter, setTodos
} from './todo.actions';
import {createReducer, on} from "@ngrx/store";
import {Item} from "./todo.model";

export interface State {
  todos: Item[];
  filters: Map<keyof Item, Item[keyof Item]>,
  filterValue: string
}

export const initialState: State = {
  todos: [],
  filters: new Map<keyof Item, Item[keyof Item]>(),
  filterValue: ''
};
export const todoReducer = createReducer(
  initialState,
  on(setTodos, (state, {todos}) => {
    return {...state, todos: [...todos]}
  }),
  on(addTodo, (state, {todo}) => {
    return {...state, todos: [...state.todos, todo]}
  }),
  on(removeTodo, (state, {id}) => {
    return {
      ...state, todos: [...state.todos.filter(todo => todo.id !== id)]
    }
  }),
  on(completeTodo, (state, {id, completed}) => {
    const updatedTodos = state.todos.map((item) =>
      item.id === id ? {...item, completed} : item
    );
    return {
      ...state,
      todos: updatedTodos
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
  }),
  on(deleteList, (state) => {
    return {
      ...state,
      todos: [],
      filters: new Map(),
      filterValue: '',
    }
  }),
  on(editTodo, (state, {id, title, description}) => {
    return {
      ...state,
      todos: state.todos.map(todo =>
        todo.id === id ? {...todo, title, description} : todo
      )
    }
  })
)
