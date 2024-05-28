import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {Item} from "../interface/item";
import {FormsModule} from "@angular/forms";
import {filterTitlePipe} from "../../pipes/filter-title.pipe";
import {filterDescriptionPipe} from "../../pipes/filter-description.pipe";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    CommonModule,
    filterTitlePipe,
    filterDescriptionPipe
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  filterByTitle= ''
  filterByDescription = ''
  @Input() data: Item[] = []
  @Output() deleted = new EventEmitter<number>()

  deleteItem(index: number) {
    this.deleted.emit(index)
  }
}
