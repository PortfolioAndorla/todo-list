import {Component, EventEmitter, Input, Output} from '@angular/core';
import { FormField } from '../../../shared/model/IformField';
import { Validators } from '@angular/forms';
import { ReusableFormComponent } from '../../../shared/components/reusable-form/reusable-form.component';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReusableFormComponent, Dialog],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<any>();
  @Input() task: any;
  visible: boolean = true;

  // form fields
  formFields: FormField[] = [
    {
      name: 'title',
      label: 'Task Title',
      type: 'text',
      placeholder: 'Enter task title',
      validators: [Validators.required],
    },
    {
      name: 'description',
      label: 'Task Description',
      type: 'textarea',
      placeholder: 'Enter task description',
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Todo', label: 'To Do' },
        { value: 'In-proccess', label: 'In Proccess' },
        { value: 'Done', label: 'Done' },
      ],
    },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'high', label: 'High' },
        { value: 'mid', label: 'Mid' },
        { value: 'low', label: 'Low' },
      ],
    },
  ];

  // data inicial del form
  initialFormData: any = {};

  ngOnChanges(): void {
    if (this.task) {
      this.initialFormData = {
        title: this.task.title,
        description: this.task.description,
        status: this.task.status,
        priority: this.task.priority,
      };
    } else {
      //reinicia el form si no hay tarea
      this.initialFormData = {
        title: '',
        description: '',
        status: '',
        priority: '',
      };
    }
  }

  onFormSubmit(formData: any): void {
    console.log('Form Data:', JSON.stringify(formData, null, 2));
    this.taskAdded.emit(formData);
    this.visible = false;
  }
}
