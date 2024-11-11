import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SubMenuItem } from 'src/app/core/models/ui models/menu.model';
import { MenuService } from '../../../../../core/services/uiServices/menu.service';
import { SidebarSubmenuComponent } from '../sidebar-submenu/sidebar-submenu.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgFor, NgClass, NgTemplateOutlet, NgIf } from '@angular/common';
import { TranslationService } from 'src/app/core/i18n';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    NgFor,
    NgClass,
    AngularSvgIconModule,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    SidebarSubmenuComponent,
  ],
})
export class SidebarMenuComponent implements OnInit {
  _translate = inject(TranslationService);
  _router = inject(Router)
  lang: string = '';
  constructor(public menuService: MenuService) {
    this.lang = this._translate.getSelectedLanguage();
  }
  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }
  ngOnInit(): void {}

  pageIsActive(route: any) {    
    return this._router.url.includes(route);
  }
}
