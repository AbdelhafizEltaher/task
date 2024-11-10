import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderPageComponent } from 'src/app/core/components/header-page/header-page.component';
import { TableGeneralComponent } from 'src/app/core/components/table-general/table-general.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableGeneralComponent , CommonModule , HeaderPageComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent {

}
