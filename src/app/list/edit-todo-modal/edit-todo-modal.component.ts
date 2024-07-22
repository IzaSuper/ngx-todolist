import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Modal} from "bootstrap";
import {Store} from "@ngrx/store";
import {Item} from "../../shared/store/todo.model";
import {editTodo} from '../../shared/store/todo.actions';

@Component({
  selector: 'app-edit-todo-modal',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './edit-todo-modal.component.html',
  styleUrl: './edit-todo-modal.component.css'
})
export class EditTodoModalComponent implements OnChanges {
  editForm: FormGroup
  @Input() item: Item

  constructor(private store: Store, private fb: FormBuilder) {
    this.editForm = this.fb.group({
      id: new FormControl('',
        [
          Validators.required]),
      title: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(20)]),
      description: new FormControl('',
        [
          Validators.required,
          Validators.maxLength(50)])
    })
  }

  ngOnChanges() {
    if (this.item) {
      this.editForm.patchValue({
        id: this.item.id,
        title: this.item.title,
        description: this.item.description
      });
    }
  }

  editTodo() {
    if (this.editForm.invalid) {
      return
    }
    const todo = this.editForm.value
    this.store.dispatch(editTodo({todo}))
    const myModal = new Modal(document.getElementById("exampleModal"))
    myModal.hide()

  }
  resetForm() {
    this.editForm.patchValue({
      id: this.item.id,
      title: this.item.title,
      description: this.item.description
    })
  }
}
