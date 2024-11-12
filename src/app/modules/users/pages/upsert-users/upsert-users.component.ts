import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppInputComponent } from 'src/app/core/components/app-input/app-input.component';
import { ButtonComponent } from 'src/app/core/components/button/button.component';
import { DropdownComponent } from 'src/app/core/components/dropdown/dropdown.component';
import { BasicsConstance } from 'src/app/core/constants/basics-constance';
import { ILookup } from 'src/app/core/models/shard/IGeneralResponse';
import { IUser } from 'src/app/core/models/users/IUser';
import { LookupsService } from 'src/app/core/services/lookups/lookups.service';
import { ModalService } from 'src/app/core/services/shardServices/model.service';
import { UserService } from 'src/app/core/services/users/user.service';

@Component({
  selector: 'app-upsert-users',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule, AppInputComponent, DropdownComponent , TranslateModule],
  templateUrl: './upsert-users.component.html',
})
export class UpsertUsersComponent {
  private _fb = inject(FormBuilder);
  private _userServices = inject(UserService);
  private _lookupServices = inject(LookupsService);
  private _modelServices = inject(ModalService);
  BasicConstants = BasicsConstance;
  CurrentUser: IUser = {} as IUser;
  errors: string = '';

  listOfRoles: ILookup[] = [];
  listOfNationalities: ILookup[] = [];
  listOfCountries: ILookup[] = [];

  constructor() {
    this.getAllLookups();
    if (this._modelServices.modelData) {
      this._modelServices.modelData.subscribe({
        next: (res) => {
          this.CurrentUser = res;
          if (this.CurrentUser && this.CurrentUser.id) {
            this.userForm.patchValue(res);
          }
        },
      });
    }
  }

  userForm: FormGroup = this._fb.group({
    id: [''],
    firstName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    lastName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    nationality_Id: [null, Validators.compose([Validators.required])],
    roleName: ['User'],
    country_Id: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email, Validators.minLength(10)])],
    userName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    password: [null, Validators.compose([Validators.minLength(5)])],
    phoneNumber: [null, Validators.compose([Validators.required, Validators.minLength(10)])],
    isActive: [true],
  });

  getAllLookups() {
    this._lookupServices.getAllRoles().subscribe((res) => (this.listOfRoles = res));
    this._lookupServices.getAllCountries().subscribe((res) => (this.listOfCountries = res));
    this._lookupServices.getAllNationalities().subscribe((res) => (this.listOfNationalities = res));
  }

  submit() {
    this._userServices.upsertUser(this.userForm.value).subscribe({
      next: (res) => {
        this._modelServices.closeSidebar({ isClosed: true, AddedSuccessfully: true });
      },
      error: (err) => {
        if (err.error.errors) {
          this.errors = err.error.errors.join(' ');
          return;
        }
       else if (err.error.message) {
          this.errors = err.error.message.join(' ');
          return;
        }
        else{
          this.errors = 'Server Error';
        }
      },
    });
  }

  closeSidebar() {
    this._modelServices.closeSidebar({ isClosed: true, AddedSuccessfully: false });
  }
}
