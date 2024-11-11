import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../../core/services/uiServices/menu.service';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobilecomponent';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LangMenuComponent } from './lang-menu/lang-menu.component';
import { BadgeModule } from 'primeng/badge';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    standalone: true,
    imports: [
        AngularSvgIconModule,
        ProfileMenuComponent,
        NavbarMobileComponent,
        LangMenuComponent,
        BadgeModule
    ],
})
export class NavbarComponent implements OnInit {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
