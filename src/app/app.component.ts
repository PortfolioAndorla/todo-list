import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderContentComponent} from './public/components/header-content/header-content.component';
import {FooterContentComponent} from './public/components/footer-content/footer-content.component';
import {TasksListComponent} from './tasks/components/tasks-list/tasks-list.component';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderContentComponent,
    FooterContentComponent,
    TasksListComponent,

  ],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'todo-list';
}
