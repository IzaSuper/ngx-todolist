import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormComponent} from "./form/form.component";
import {ListComponent} from "./list/list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  array: { id: number, title: string, description: string }[] = [];

  addTodo(todo: { id: number, title: string, description: string }) {
    this.array = [
      todo,
      ...this.array
    ]
  }

  deleted(id: number) {
    this.array = [
      ...this.array.filter(item => item.id !== id)
    ]
  }
}
