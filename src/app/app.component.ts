import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FormComponent} from "./form/form.component";
import {ListComponent} from "./list/list.component";
import {GlobalActionsComponent} from "./global-actions/global-actions.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent, ListComponent, GlobalActionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
