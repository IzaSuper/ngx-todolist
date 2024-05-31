import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {Item} from "../interface/item";
import {FormsModule} from "@angular/forms";
import {filterByDataPipe} from "../../pipes/filter-by-data.pipe";
import {globalFilterPipe} from "../../pipes/global-filter.pipe";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    CommonModule,
    filterByDataPipe,
    globalFilterPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnChanges {

  columns = []
  isEmpty = true

  @Input() data: Item[] = []
  @Input() filterValue: string = ''
  @Output() deleted = new EventEmitter<number>()
  @Output() checkboxChanged = new EventEmitter<{ index: number, checked: boolean }>()
  filterDefinition = new Map();

  ngOnChanges(): void {
    if (this.data.length === 0) {
      this.isEmpty = true
      this.columns = []
    } else {
      this.isEmpty = false
      this.columns = Object.keys(this.data[0])
    }
  }

  deleteItem(index: number) {
    this.deleted.emit(index)
  }

  isCheckboxChanged(index: number, event: Event) {
    const inputElement = event.target as HTMLInputElement
    this.checkboxChanged.emit({index, checked: inputElement.checked})
  }

  setFilter($event: Event, column: string) {
    const value = ($event.target as HTMLInputElement).value
    this.filterDefinition.set(column, value)
    this.filterDefinition = new Map([...this.filterDefinition])
  }
}
