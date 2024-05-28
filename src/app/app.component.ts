import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormComponent} from "./form/form.component";
import {ListComponent} from "./list/list.component";
import {Item} from "./interface/item";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  array: Item[] = [];

  ngOnInit() {
    const savedList = localStorage.getItem('list')
    if (savedList) {
      this.array = JSON.parse(savedList)
    }
  }

  private saveList() {
    localStorage.setItem('list', JSON.stringify(this.array))
  }


  addTodo(todo: Item) {
    this.array = [
      todo,
      ...this.array
    ]
    this.saveList()
  }

  deleted(indexToRemove: number) {
    this.array = [
      ...this.array.filter((_, index) => index !== indexToRemove)
    ]
    this.saveList()
  }
}
