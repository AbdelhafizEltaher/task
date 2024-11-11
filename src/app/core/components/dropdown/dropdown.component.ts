import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppErrorComponent } from '../app-error/app-error.component';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AppErrorComponent , DropdownModule],
})
export class DropdownComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() name: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() validation: string[] = [];
  @Input() parentForm!: FormGroup;
  @Input() options: {id:number , name : string}[] = [];

}
