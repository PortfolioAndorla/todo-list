import { Component } from '@angular/core';
import {MenubarComponent} from './menubar/menubar.component';

@Component({
  selector: 'app-tasks-list',
  imports: [
    MenubarComponent
  ],
  templateUrl: './tasks-list.component.html',
  standalone: true,
  styleUrl: './tasks-list.component.css'
})
export class TasksListComponent {

}
