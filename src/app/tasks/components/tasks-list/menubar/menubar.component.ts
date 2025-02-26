import {Component, OnInit} from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {SplitButton} from 'primeng/splitbutton';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menubar',
  imports: [
    ToolbarModule,
    ButtonModule,
    SplitButton,
    InputTextModule,
    IconField,
    InputIcon,

  ],
  templateUrl: './menubar.component.html',
  standalone: true,
  styleUrl: './menubar.component.css'
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      }
    ];
  }
}
