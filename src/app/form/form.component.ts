import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {v4 as uuidv4} from 'uuid';
import {Store} from "@ngrx/store";
import {addTodo} from "../shared/store/todo.actions";
import {Item} from "../shared/store/todo.model";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  constructor(private store: Store<{ todos: Item[] }>) {
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
      id: uuidv4(),
      title: this.reactiveForm.get('title').value,
      description: this.reactiveForm.get('description').value,
      completed: false
    }
    this.store.dispatch(addTodo({todo}))
    this.reactiveForm.reset()
  }
}
