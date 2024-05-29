import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Item} from "../interface/item";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  reactiveForm: FormGroup

  @Output() data = new EventEmitter<Item>()

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

  add() {
    if (this.reactiveForm.invalid) {
      return
    }
    this.data.emit({
      title: this.reactiveForm.get('title').value,
      description: this.reactiveForm.get('description').value,
      completed: false,
    })
    this.reactiveForm.reset()
  }
}
