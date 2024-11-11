import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'general-table',
  standalone: true,
  imports: [CommonModule , TranslateModule , ButtonModule , TooltipModule],
  templateUrl: './table-general.component.html',
  styleUrl: './table-general.component.scss'
})
export class TableGeneralComponent {
  @Input() tableData: any[] = [];
  @Input() tableHeader: {field : string , header : string}[] = [];
  @Input() totalCount : number = 0;
  @Input() enableAction : boolean = false
  @Output() togglePopUp = new EventEmitter<{ event: Event; row: any }>();
  @Output() deletePopUp = new EventEmitter<{ event: Event; row: any }>();
  @Output() openEditModel = new EventEmitter<any>();
  @Output() openViewModel = new EventEmitter<any>();

  onTogglePopUp(event: Event, row: any) {
    this.togglePopUp.emit({ event, row });
  }

  onDeletePopUp(event: Event, row: any) {
    this.deletePopUp.emit({ event, row });
  }

  onOpenEditModel(row: any) {
    this.openEditModel.emit(row);
  }

  onOpenViewModel(row: any) {
    this.openViewModel.emit(row);
  }
  constructor() {
  }
  ngOnInit(): void {}
}
