import { Component, inject, Inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ClickOutsideDirective } from '../../../../../core/directives/click-outside.directive';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThemeService } from 'src/app/core/services/uiServices/theme.service';
import { BasicsConstance } from 'src/app/core/constants/basics-constance';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TranslationService } from 'src/app/core/i18n';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, AngularSvgIconModule],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          transform: 'translateY(0)',
          visibility: 'visible',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translateY(-20px)',
          visibility: 'hidden',
        }),
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')]),
    ]),
  ],
})
export class ProfileMenuComponent implements OnInit {
  public isOpen = false;
  _translate = inject(TranslationService);
  private _authServices = inject(AuthService);
  lang: string = '';
  public profileMenu: any[] = [];

  public themeColors = [
    {
      name: 'base',
      code: '#e11d48',
    },
    {
      name: 'yellow',
      code: '#f59e0b',
    },
    {
      name: 'green',
      code: '#22c55e',
    },
    {
      name: 'blue',
      code: '#3b82f6',
    },
    {
      name: 'orange',
      code: '#ea580c',
    },
    {
      name: 'red',
      code: '#cc0022',
    },
    {
      name: 'violet',
      code: '#6d28d9',
    },
  ];

  public themeMode = ['light', 'dark'];

  constructor(public themeService: ThemeService) {
    this.lang = this._translate.getSelectedLanguage();
    this.profileMenu = [
      {
        title: 'Your Profile',
        icon: './assets/icons/heroicons/outline/user-circle.svg',
        link: '/profile',
      },
      {
        title: 'Settings',
        icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
        link: '/settings',
      },
      {
        title: this.lang == 'en' ? 'Arabic ' : 'English',
        icon:
          this.lang == 'en'
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png?20231030035225'
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/640px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
        hasAction: true,
      },
      {
        title: 'Log out',
        icon: './assets/icons/heroicons/outline/logout.svg',
        link: '/auth',
      },
    ];
  }

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  toggleThemeMode() {
    this.themeService.theme.update((theme) => {
      const mode = !this.themeService.isDark ? 'dark' : 'light';
      return { ...theme, mode: mode };
    });
  }

  toggleThemeColor(color: string) {
    this.themeService.theme.update((theme) => {
      return { ...theme, color: color };
    });
  }

  changeLang() {
    this._translate.changeLang(this.lang == 'en' ? 'ar' : 'en');
  }
  logout(){
    this._authServices.logout(localStorage.getItem(BasicsConstance.USER_ID) || '');
  }
}
