import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {
  addTodo,
  addTodoSuccess,
  apiError,
  completeTodo,
  completeTodoSuccess,
  editTodo, editTodoSuccess,
  removeTodo,
  removeTodoSuccess, setTodos, setTodosSuccess
} from "./todo.actions";
import {of} from "rxjs";
import {catchError, exhaustMap, map, switchMap, tap} from "rxjs/operators";
import {Item} from "./todo.model";
import {environment} from "../../../environments/environment";

@Injectable()
export class TodoEffects {
  constructor(private actions$: Actions, private http: HttpClient) {
  }

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(action =>
        this.http.post<Item>(
          `${environment.apiUrl}`, action.todo
        ).pipe(
          map((todo: Item) => addTodoSuccess({todo})),
          catchError((err) => {
            return of(apiError(err))
          })
        ))
    ))
  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap(action =>
        this.http.delete<void>(
          `${environment.apiUrl}/${action.id}`)
          .pipe(
            tap(() => console.log("todo deleted success", action.id)),
            map(() => removeTodoSuccess({id: action.id})),
            catchError((err) => {
              if (err.status === 0) {
                console.log("Looks like you are offline. Check your internet connection")
              } else {
                console.log('unrecognized error')
              }
              return of(apiError(err))
            })
          ))
    ))
  completeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(completeTodo),
      switchMap(action =>
        this.http.put<Item>(
          `${environment.apiUrl}/${action.todo.id}`, action.todo)
          .pipe(
            tap(() => console.log("todo updated success", action.todo.completed)),
            map((todo) => completeTodoSuccess({todo})),
            catchError((err) => {
              if (err.status === 0) {
                console.log("Looks like you are offline. Check your internet connection")
              } else {
                console.log('unrecognized error')
              }
              return of(apiError(err))
            })
          ))
    ))
  editTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editTodo),
      switchMap(action =>
        this.http.put<Item>(
          `${environment.apiUrl}/${action.todo.id}`, action.todo)
          .pipe(
            tap(() => console.log("todo edited success", action.todo)),
            map((todo) => editTodoSuccess({todo})),
            catchError((err) => {
              if (err.status === 0) {
                console.log("Looks like you are offline. Check your internet connection")
              } else {
                console.log('unrecognized error')
              }
              return of(apiError(err))
            })
          ))
    ))
  setTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setTodos),
      switchMap(action =>
        this.http.get<Item[]>(environment.apiUrl)
          .pipe(
            tap(() => console.log("todo loaded success")),
            map((todos) => {
              return setTodosSuccess({todos})
            }),
            catchError((err) => {
              if (err.status === 0) {
                console.log("Looks like you are offline. Check your internet connection")
              } else {
                console.log('unrecognized error')
              }
              return of(apiError(err))
            })
          ))
    ))
}
