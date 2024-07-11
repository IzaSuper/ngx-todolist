import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Modal} from "bootstrap";
import {Store} from "@ngrx/store";
import {Item} from "../../shared/store/todo.model";
import {editTodo} from '../../shared/store/todo.actions';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

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
  editId: string
  editForm: FormGroup
  @Input() item: Item

  constructor(private store: Store, private fb: FormBuilder, private http: HttpClient) {
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

  editTodo(id: string) {
    if (this.editForm.invalid) {
      return
    }
    this.editId = this.editForm.get("id").value
    const editTitle = this.editForm.get("title").value
    const editDescription = this.editForm.get("description").value
    const body = {
      id: this.editId,
      title: editTitle,
      description: editDescription,
      completed: this.item.completed
    }
    this.http.put(`${environment.apiUrl}/${id}`, body)
      // .pipe(
      //   catchError((err) => {
      //     console.log(err)
      //   })
      // )
      .subscribe(() => {
          console.log("todo updated")
          this.store.dispatch(editTodo(this.editForm.value))
          const myModal = new Modal(document.getElementById("exampleModal"))
          myModal.hide()
        })
  }
  resetForm() {
    this.editForm.patchValue({
      id: this.item.id,
      title: this.item.title,
      description: this.item.description
    })
  }
}
