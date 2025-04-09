import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {SplitButton} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';
import {Checkbox} from 'primeng/checkbox';

@Component({
  selector: 'app-menubar',
  imports: [
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    Checkbox,

  ],
  templateUrl: './menubar.component.html',
  standalone: true,
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  @Output() openFormDialog = new EventEmitter<any>();
  @Output() checkAll = new EventEmitter<boolean>();
  @Output() deleteAllTasks = new EventEmitter<void>();

  checked: boolean = false;
  items: MenuItem[] | undefined;


  deleteTasks(): void {
    this.deleteAllTasks.emit();
  }

  onCheckboxChange(): void {
    this.checked = !this.checked;
    this.checkAll.emit(this.checked);
  }

  formDialog() {
    this.openFormDialog.emit();
  }



}
