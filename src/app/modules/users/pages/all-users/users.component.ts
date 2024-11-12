import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { HeaderPageComponent } from 'src/app/core/components/header-page/header-page.component';
import { TableGeneralComponent } from 'src/app/core/components/table-general/table-general.component';
import { IUser } from 'src/app/core/models/users/IUser';
import { IUserSearch } from 'src/app/core/models/users/IUserSearch';
import { UserService } from 'src/app/core/services/users/user.service';
import { UsersState } from 'src/app/core/Store/users/usersReducer';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ToasterService } from 'src/app/core/services/uiServices/toaster.service';
import { UpsertUsersComponent } from '../upsert-users/upsert-users.component';
import { ModalService } from 'src/app/core/services/shardServices/model.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppInputWithNgModelComponent } from 'src/app/core/components/app-input-with-ng-model/app-input-with-ng-model.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { AppDropdownWithNgModelComponent } from 'src/app/core/components/app-dropdown-with-ng-model/app-dropdown-with-ng-model.component';
import { ILookup } from 'src/app/core/models/shard/IGeneralResponse';
import { LookupsService } from 'src/app/core/services/lookups/lookups.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    TableGeneralComponent,
    AppInputWithNgModelComponent,
    AppDropdownWithNgModelComponent,
    OverlayPanelModule,
    CommonModule,
    HeaderPageComponent,
    ConfirmPopupModule,
    ButtonComponent,
    TranslateModule
  ],
  providers: [ConfirmationService],
  templateUrl: './users.component.html',
})
export class UsersComponent {
  header: { field: string; header: string }[] = [
    { field: 'firstName', header:  'TablesHeaders.UsersTable.First_Name' },
    { field: 'lastName', header: 'TablesHeaders.UsersTable.Last_Name' },
    { field: 'userName', header: 'TablesHeaders.UsersTable.User_Name' },
    { field: 'email', header: 'TablesHeaders.UsersTable.Email' },
    { field: 'phoneNumber', header: 'TablesHeaders.UsersTable.Phone_Number' },
    { field: 'roleName', header: 'TablesHeaders.UsersTable.Role' },
  ];
  usersList: IUser[] = [];
  searchModel: IUserSearch = {} as IUserSearch;
  listOfRoles: ILookup[] = [];
  listOfNationalities: ILookup[] = [];
  listOfCountries: ILookup[] = [];
  enableSearchInTime$ = new Subject<string>();

  private store = inject(Store<{ users: UsersState }>);
  private _userServices = inject(UserService);
  private _confirmationService = inject(ConfirmationService);
  private _toast = inject(ToasterService);
  private _modalService = inject(ModalService);
  private _lookupServices = inject(LookupsService);
  private _translate = inject(TranslateService);

  constructor() {
    this.store
      .select((state) => state.users.users)
      .subscribe((res) => {
        this.usersList = res;
      });

      this.getAllData();
      this.getAllLookups();
   
  }

  getAllData(){
     this._userServices.getAllUsers(this.searchModel);
  }
  ngOnInit(): void {
    this.enableSearchInTime$.pipe(debounceTime(800)).subscribe(() => {
      this.getAllData();
    });
  }

  searchWithText(){
    this.enableSearchInTime$.next(this.searchModel.search);
  }
  clearData(){
    this.searchModel = {} as IUserSearch;
    this.getAllData();
  }

  getAllLookups() {
    this._lookupServices.getAllCountries().subscribe((res) => (this.listOfCountries = res));
    this._lookupServices.getAllNationalities().subscribe((res) => (this.listOfNationalities = res));
  }

  deletePopUp(acceptData: { event: Event; row: any }): void {
    this._confirmationService.confirm({
      target: acceptData.event.target as EventTarget,
      message: `Do You Want to Delete ${acceptData.row.fullName} ?`,
      icon: 'pi pi-info-circle text-red-500',
      accept: () => {
        this.deleteItem(acceptData.row);
      },
      acceptButtonStyleClass: ' px-3 py-2 bg-blue-600 text-white mx-2',
      rejectButtonStyleClass: ' px-3 py-2 bg-red-600 text-white',
    });
  }

  deleteItem(item: IUser): void {
    this._userServices.deleteUser(item.id, this.searchModel).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          this._toast.success(res.message);
        } else {
          this._toast.warning(res.message);
        }
      },
    });
  }

  togglePopUp(acceptData: { event: Event; row: any }): void {
    this._confirmationService.confirm({
      target: acceptData.event.target as EventTarget,
      message: `Do You Want ${(acceptData.row.isActive ? ' DeActivate ' : ' Activate ') + acceptData.row.fullName} ?`,
      icon: 'pi pi-exclamation-triangle ',
      accept: () => {
        this.toggleItem(acceptData.row);
      },
      acceptButtonStyleClass: ' px-3 py-2 bg-blue-600 text-white mx-2',
      rejectButtonStyleClass: ' px-3 py-2 bg-red-600 text-white',
    });
  }

  toggleItem(item: IUser): void {
    this._userServices.toggleUser(item.id, this.searchModel).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          this._toast.success(res.message);
        } else {
          this._toast.warning(res.message);
        }
      },
    });
  }

  openAddModel() {
    this._modalService.openModal(UpsertUsersComponent, 'Add User', 'right', '40%', null, true);
  }

  openEditModel(data: IUser) {
    this._modalService.openModal(UpsertUsersComponent, 'Edit User', 'right', '40%', data, true);
  }
  openViewModel(data: IUser) {
    this._modalService.openModal(UpsertUsersComponent, 'View User', 'right', '50%', data, true);
  }

  changePage(e: any) {
    this.searchModel.pageIndex = e.pageIndex;
    this.searchModel.pageSize = e.pageSize;
    this._userServices.getAllUsers(this.searchModel);
  }
}
