import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {setGlobalFilter} from "../shared/store/todo.actions";
import {map, Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectTodos} from "../shared/store/todo.selectors";
import {AsyncPipe, NgIf} from "@angular/common";
@Component({
  selector: 'app-global-actions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './global-actions.component.html',
  styleUrl: './global-actions.component.css'
})
export class GlobalActionsComponent {
  todosLength$: Observable<number>

  constructor(
    private store: Store,
  ) {
    this.todosLength$ = this.store.pipe(select(selectTodos)).pipe(
      map(todos => todos.length)
    )
  }
  setGlobalFilter($event: Event) {
    const filterValue = ($event.target as HTMLInputElement).value
    this.store.dispatch(setGlobalFilter({filterValue}))
  }
}
