import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {Item} from "../interface/item";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() data: Item[] = []
  @Output() deleted = new EventEmitter<number>()

  deleteItem(index: number) {
    this.deleted.emit(index)
  }
}
