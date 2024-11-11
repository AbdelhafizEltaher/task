import { Component, inject, OnInit } from '@angular/core';
import packageJson from '../../../../../../package.json';
import { MenuService } from '../../../../core/services/uiServices/menu.service';
import { RouterLink } from '@angular/router';
import { SidebarMenuComponent } from './sidebar-menu/sidebar-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { BasicsConstance } from 'src/app/core/constants/basics-constance';
import { TranslationService } from 'src/app/core/i18n';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [NgClass, NgIf, AngularSvgIconModule, SidebarMenuComponent],
})
export class SidebarComponent implements OnInit {
  public appJson: any = packageJson;
  lang: string = '';
  _translate = inject(TranslationService);
  private _authServices = inject(AuthService);

  constructor(public menuService: MenuService) {
    this.lang = this._translate.getSelectedLanguage();
  }

  ngOnInit(): void {}

  public toggleSidebar() {
    this.menuService.toggleSidebar();
  }

  logout(){
    this._authServices.logout(localStorage.getItem(BasicsConstance.USER_ID) || '');
  }
}
