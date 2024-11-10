import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: '[general-table]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-general.component.html',
  styleUrl: './table-general.component.scss'
})
export class TableGeneralComponent {
  @Input() tableData: any[] = [];
  @Input() tableHeader: any[] = [];
  @Input() totalCount : number = 0;

  constructor() {
  }

  ngOnInit(): void {}
}
