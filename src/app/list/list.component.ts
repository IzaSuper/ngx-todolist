import {Component} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {Item} from "../shared/store/todo.model";
import {Observable, combineLatest} from "rxjs";
import {map} from 'rxjs/operators';
import {select, Store} from "@ngrx/store";
import {selectFilters, selectGlobalFilterValue, selectTodos} from "../shared/store/todo.selectors";
import {completeTodo, removeTodo, setFilterValues} from "../shared/store/todo.actions";
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
export class ListComponent {
  todos$: Observable<Item[]>
  filters$: Observable<Map<keyof Item, string | boolean>>
  filtered$: Observable<Item[]>
  isEmpty = true
  columns: (keyof Item)[] = ['id', 'title', "description", "completed"]
  editItem: Item


  constructor(private store: Store) {
    this.filters$ = this.store.pipe(select(selectFilters))
    this.todos$ = this.store.pipe(select(selectTodos));
    this.todos$.subscribe(todos => {
      this.isEmpty = todos.length === 0;
      if (this.isEmpty) {
        this.columns = [];
      } else {
        this.columns = Object.keys(todos[0]) as (keyof Item)[];
      }
    });
    this.filtered$ = combineLatest([
      this.todos$,
      this.filters$,
      store.pipe(select(selectGlobalFilterValue))
    ]).pipe(
      map(([todos, filters, filterValue]) => {
        const lowerCaseFilterValue = filterValue.toLowerCase();
        return todos.filter(todo => {
          if (
            lowerCaseFilterValue !== "" &&
            (!todo.title.toLowerCase().includes(lowerCaseFilterValue) &&
              !todo.description.toLowerCase().includes(lowerCaseFilterValue))
          ) {
            return false;
          }
          for (let [key, value] of filters) {
            switch (key) {
              case 'completed':
                if (value !== 'all' && todo[key].toString() !== value) {
                  return false;
                }
                break;
              case 'title':
              case 'description':
                const lowerCaseValue = value.toString().toLowerCase();
                if (lowerCaseValue !== '' && !todo[key]?.toLowerCase().includes(lowerCaseValue)) {
                  return false;
                }
                break;
              default:
                console.log('Unrecognized type');
                break;
            }
          }
          return true;
        });
      })
    );
  }

  deleteItem(id: string) {
    this.store.dispatch(removeTodo({id}));
  }

  isTodoCompleted(id: string, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.store.dispatch(completeTodo({id, completed: inputElement.checked}));
  }

  setFilter(column: keyof Item, $event: Event) {
    const value = ($event.target as HTMLInputElement).value;
    this.store.dispatch(setFilterValues({column, value}))
  }

  confirmModal(item: Item) {
    this.editItem = item
    const myModal = new Modal(document.getElementById("exampleModal"))
    myModal.show()
  }
}
