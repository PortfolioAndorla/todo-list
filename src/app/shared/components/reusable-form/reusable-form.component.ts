import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {IftaLabel} from 'primeng/iftalabel';
import {Select} from 'primeng/select';
import {FloatLabel} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Textarea} from 'primeng/textarea';

export interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: { value: any; label: string }[];
  validators?: any[];
}

@Component({
  selector: 'app-reusable-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    IftaLabel,
    Select,
    FloatLabel,
    Button,
    InputText,
    Textarea,
  ],
  templateUrl: './reusable-form.component.html',
  styleUrls: ['./reusable-form.component.css'],
})
export class ReusableFormComponent implements OnInit{


  @Input() formFields: FormField[] = [];
  @Input() initialFormData: any = {};
  @Output() formSubmit = new EventEmitter<any>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.createForm();
    this.setInitialFormData();
  }

  createForm(): void {
    for (const field of this.formFields) {
      this.form.addControl(
        field.name,
        this.fb.control('', field.validators || [])
      );
    }
  }

  setInitialFormData(): void {
    if (this.initialFormData) {
      this.form.patchValue(this.initialFormData);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.value;

      if (formValue.status) {
        formValue.status = formValue.status.label.toUpperCase();
      }
      if (formValue.priority) {
        formValue.priority = formValue.priority.label.toUpperCase();
      }

      this.formSubmit.emit(formValue);
    }
  }
}
