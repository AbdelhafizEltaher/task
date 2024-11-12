import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-dropdown-with-ng-model',
  standalone: true,
  imports: [CommonModule, FormsModule, DropdownModule],
  templateUrl: './app-dropdown-with-ng-model.component.html',
  styleUrl: './app-dropdown-with-ng-model.component.scss',
})
export class AppDropdownWithNgModelComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputName: string = '';
  @Input() name: string = '';
  @Input() options: { id: number; name: string }[] = [];
  @Input() modelValue: any;

}
