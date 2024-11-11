import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BasicsConstance } from '../../constants/basics-constance';


export interface IValidation {
  message: string,
  type: string
}


@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './app-error.component.html',
  styleUrl: './app-error.component.scss'
})

export class AppErrorComponent {
  @Input() control!: AbstractControl;
  @Input() validation: string[] = [];
  @Input() name: string = "";
  BasicConstants = BasicsConstance
  constructor() { }
}
