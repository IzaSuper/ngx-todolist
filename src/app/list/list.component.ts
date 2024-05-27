import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";

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
  @Input() inputWorks: { id: number, title: string, description: string }[] = []
  @Output() deleted = new EventEmitter<number>()

  deleteItem(id: number) {
    this.deleted.emit(id)
  }
}
