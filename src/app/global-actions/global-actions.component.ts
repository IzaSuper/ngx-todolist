import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Item} from "../interface/item";

@Component({
  selector: 'app-global-actions',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './global-actions.component.html',
  styleUrl: './global-actions.component.css'
})
export class GlobalActionsComponent {

  @Input() data: Item[] = []
  @Output() deleteList = new EventEmitter()
  @Output() filterList = new EventEmitter<string>()
  filterValue = '';

  deleteToDoList() {
      this.deleteList.emit()
  }
  filterByToDo() {
    this.filterList.emit(this.filterValue)
  }
}
