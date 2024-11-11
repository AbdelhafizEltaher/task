import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideDirective } from 'src/app/core/directives/click-outside.directive';
import { TranslationService } from 'src/app/core/i18n';

@Component({
  selector: 'lang-menu',
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, AngularSvgIconModule],
  templateUrl: './lang-menu.component.html',
  styleUrl: './lang-menu.component.scss',
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
export class LangMenuComponent {
  public openLangMenu = false;
  _translate = inject(TranslationService);
  lang: string = '';
  public langMenu: any[] = [];

  constructor() {
    this.lang = this._translate.getSelectedLanguage();
    this.langMenu = [
      {
        title: this.lang == 'en' ? 'العربية ' : 'English',
        icon:
          this.lang == 'en'
            ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png?20231030035225'
            : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/640px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
        hasAction: true,
      },
    ];
  }

  ngOnInit(): void {}

  public toggleLanguageMenu(): void {
    this.openLangMenu = !this.openLangMenu;
  }

  changeLang() {
    this._translate.changeLang(this.lang == 'en' ? 'ar' : 'en');
  }
}
