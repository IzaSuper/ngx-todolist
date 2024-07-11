import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule, NgIf} from "@angular/common";
import {Store} from "@ngrx/store";
import {addTodo} from "../shared/store/todo.actions";
import {Item} from "../shared/store/todo.model";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  providers: [HttpClientModule, CommonModule]
})
export class FormComponent implements OnInit {

  constructor(private store: Store, private http: HttpClient) {
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

    this.http.post(environment.apiUrl, todo)
      .subscribe((result: Item) => {
        console.log("todo added")
        this.store.dispatch(addTodo({todo: result}))
        this.reactiveForm.reset()
      })
  }
}
