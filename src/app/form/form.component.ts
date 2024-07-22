import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {addTodo} from "../shared/store/todo.actions";
import {Item} from "../shared/store/todo.model";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [HttpClientModule, CommonModule]
})
export class FormComponent implements OnInit {

  constructor(private store: Store) {
  }

  reactiveForm: FormGroup

  ngOnInit() {
    this.reactiveForm = new FormGroup({
      title: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(20)]
      ),
      description: new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(50)
        ]
      )
    })
  }

  onAdd() {
    if (this.reactiveForm.invalid) {
      return
    }
    const todo: Item = {
      title: this.reactiveForm.get('title').value,
      description: this.reactiveForm.get('description').value,
      completed: false
    }

    this.store.dispatch(addTodo({todo}))
    this.reactiveForm.reset()

  }
}
