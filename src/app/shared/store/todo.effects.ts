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
import {catchError, map, switchMap, tap} from "rxjs/operators";
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
            map(() => removeTodoSuccess({id: action.id})),
            catchError((err) => {
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
            map((todo) => completeTodoSuccess({todo})),
            catchError((err) => {
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
            map((todo) => editTodoSuccess({todo})),
            catchError((err) => {
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
            map((todos) => {
              return setTodosSuccess({todos})
            }),
            catchError((err) => {
              return of(apiError(err))
            })
          ))
    ))
}
