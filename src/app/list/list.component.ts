import {Component, OnInit} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {Item} from "../shared/store/todo.model";
import {Observable, take} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectAllTodos, selectFilters, selectTodos} from "../shared/store/todo.selectors";
import {completeTodo, setTodos, removeTodo, setFilterValues} from "../shared/store/todo.actions";
import {Modal} from "bootstrap";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EditTodoModalComponent} from "./edit-todo-modal/edit-todo-modal.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditTodoModalComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  todos$: Observable<Item[]>
  filters$: Observable<Map<keyof Item, string | boolean>>
  isEmpty = true
  columns: (keyof Item)[] = ['id', 'title', "description", "completed"]
  editItem: Item

  constructor(private store: Store) {
    this.filters$ = this.store.pipe(select(selectFilters))
    this.todos$ = this.store.pipe(select(selectTodos))
    this.store.select(selectAllTodos)
      .subscribe(todos => {
        this.isEmpty = todos.length === 0;
      });
  }

  ngOnInit(): void {
    this.store.dispatch(setTodos())
  }

  deleteItem(id: string) {
    this.store.dispatch(removeTodo({id}));
  }

  isTodoCompleted(id: string, event: Event) {
    const completed = (event.target as HTMLInputElement).checked;
    this.todos$.pipe(take(1)).subscribe(todos => {
      const todo = todos.find(todo => todo.id === id)
      if (todo) {
        this.store.dispatch(completeTodo({
          todo: {
            ...todo,
            completed
          }
        }))
      }
    })
  }

  setFilter(column: keyof Item, $event: Event) {
    if (column === "completed") {
      const value = ($event.target as HTMLInputElement).value
      const castValue = value === "" ? "" : value === "true"
      this.store.dispatch(setFilterValues({column, value: castValue}))
    } else {
      const value = ($event.target as HTMLInputElement).value
      this.store.dispatch(setFilterValues({column, value}))
    }
  }

  confirmModal(item: Item) {
    this.editItem = item
    const myModal = new Modal(document.getElementById("exampleModal"))
    myModal.show()
  }
}
