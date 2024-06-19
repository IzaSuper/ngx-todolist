import { Component } from '@angular/core';
import {deleteList} from "../../shared/store/todo.actions";
import {Modal} from "bootstrap";
import {Store} from "@ngrx/store";
@Component({
  selector: 'app-delete-list-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-list-modal.component.html',
  styleUrl: './delete-list-modal.component.css'
})
export class DeleteListModalComponent {
  constructor(private store: Store) {
  }
  deleteToDoList() {
    this.store.dispatch(deleteList())
    const myModal = new Modal(document.getElementById('myModal'))
    myModal.hide()
  }
}
