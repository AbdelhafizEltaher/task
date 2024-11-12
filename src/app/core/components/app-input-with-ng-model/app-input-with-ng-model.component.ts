import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-with-ng-model',
  standalone: true,
  imports: [CommonModule , FormsModule  ],
  templateUrl: './app-input-with-ng-model.component.html',
  styleUrl: './app-input-with-ng-model.component.scss',
})
export class AppInputWithNgModelComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() name: string = '';
  @Input() type: 'text' | 'email' | 'password' | 'number' = 'text';
  @Input() modelValue: any;
}
