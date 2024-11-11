import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppErrorComponent } from '../app-error/app-error.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule , ReactiveFormsModule , AppErrorComponent],
  templateUrl: './app-input.component.html',
  styleUrl: './app-input.component.scss',
})
export class AppInputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() name: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() validation: string[] = [];
  @Input() parentForm!: FormGroup;

}
