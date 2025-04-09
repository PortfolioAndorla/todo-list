import { Component, OnInit } from '@angular/core';
import { MenubarComponent } from './menubar/menubar.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Button } from 'primeng/button';
import { Message } from 'primeng/message';
import { Card } from 'primeng/card';
import { Textarea } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { Task } from '../../model/task.entity';
import { TaskService } from '../../services/task.service';
import {TaskWithState} from '../../model/ITaskWithState';

@Component({
  selector: 'app-tasks-list',
  imports: [
    MenubarComponent,
    FormsModule,
    SelectButtonModule,
    Checkbox,
    ToastModule,
    TaskFormComponent,
    Button,
    Message,
    Card,
    InputTextModule,
    Textarea,
  ],
  templateUrl: './tasks-list.component.html',
  standalone: true,
  styleUrl: './tasks-list.component.css',
})

export class TasksListComponent implements OnInit {
  buttonOptions: any[] = [];
  value: any;
  taskData: TaskWithState [] = [];
  onEdit: boolean = false;
  currentTask: TaskWithState  | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.buttonOptions = [
      { label: 'Status', value: 'status' },
      { label: 'Priority', value: 'priority' },
    ];
    this.loadTaskData();
  }

  loadTaskData(): void {
    this.taskService.getAll().subscribe({
      next: (taskData: Task[]) => {

        // Map Task objects to TaskWithState and initialize temporary states
        this.taskData = taskData.map((task) => ({
          ...task,
          isViewing: false,
          completed: false,
        }));
      },
      error: (error) => {
        console.error('Error loading taskData:', error);
      },
    });
  }

  onAddingTask(): void {
    this.onEdit = true;
  }

  onTaskAdded(task: Task): void {
    if (this.currentTask) {
      this.taskService.update(this.currentTask.id, task).subscribe({
        next: (updatedTask) => {
          const index = this.taskData.findIndex((t) => t.id === updatedTask.id);
          if (index !== -1) {
            this.taskData[index] = { ...updatedTask, isViewing: this.taskData[index].isViewing, completed: this.taskData[index].completed };
          }
          this.taskData = [...this.taskData];
        },
        error: (error) => {
          console.error('Error updating task:', error);
        },
      });
    } else {
      // Create a new task
      this.taskService.create(task).subscribe({
        next: (newTask) => {
          this.taskData.push({ ...newTask, isViewing: false, completed: false });
          this.taskData = [...this.taskData];
        },
        error: (error) => {
          console.error('Error creating task:', error);
        },
      });
    }
    this.onEdit = false;
    this.currentTask = null;
  }

  onViewTask(task: TaskWithState): void {
    const updatedTask = { ...task, isViewing: !task.isViewing };
    const index = this.taskData.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      this.taskData[index] = updatedTask;
      this.taskData = [...this.taskData];
    }
  }

  onCheckboxChange(task: TaskWithState): void {
    task.completed = !task.completed;
    task.status = task.completed ? 'DONE' : 'TODO';
    this.taskService.update(task.id, task).subscribe({
      next: (updatedTask) => {
        const index = this.taskData.findIndex((t) => t.id === updatedTask.id);
        if (index !== -1) {
          this.taskData[index] = { ...updatedTask, isViewing: task.isViewing, completed: task.completed };
        }
        this.taskData = [...this.taskData];
      },
      error: (error) => {
        console.error('Error updating task:', error);
      },
    });
  }

  onCheckAll(checked: boolean): void {
    this.taskData.forEach((task) => (task.completed = checked));
  }

  deleteCompletedTasks(): void {
    const completedTasks = this.taskData.filter((task) => task.completed);
    completedTasks.forEach((task) => {
      this.taskService.deleteById(task.id).subscribe({
        next: () => {
          this.taskData = this.taskData.filter((t) => t.id !== task.id);
          this.taskData = [...this.taskData];
        },
        error: (error) => {
          console.error('Error deleting task:', error);
        },
      });
    });
  }

  deleteTask(task: TaskWithState): void {
    this.taskService.deleteById(task.id).subscribe({
      next: () => {
        this.taskData = this.taskData.filter((t) => t.id !== task.id);
        this.taskData = [...this.taskData];
      },
      error: (error) => {
        console.error('Error deleting task:', error);
      },
    });
  }

  onEditTask(task: TaskWithState): void {
    this.currentTask = task;
    this.onEdit = true;
  }
}
