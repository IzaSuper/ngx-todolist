import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  reactiveForm: FormGroup
  private currentId = 0

  // TODO rename me to add()
  @Output() outputWorks = new EventEmitter<{
    id: number,
    title: string,
    description: string
  }>()

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

  submitted() {
    if (this.reactiveForm.invalid) {
      return
    }
    this.outputWorks.emit({
      id: this.currentId++,
      title: this.reactiveForm.get('title').value,
      description: this.reactiveForm.get('description').value
    })
    this.reactiveForm.reset()
  }
}
