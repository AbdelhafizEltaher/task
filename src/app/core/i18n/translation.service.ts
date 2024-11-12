import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { BasicsConstance } from 'src/app/core/constants/basics-constance';

export interface Locale {
  lang: string;
  data: any;
}

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private langIds: any = [];
  CurrentLangInfo: { Currentlang: string; CurrentLangImage: string } = { Currentlang: 'en', CurrentLangImage: '' };
  subject = new Subject<string>(); // subject to notify of direction changes
  myObservable = this.subject.asObservable();

  constructor(private translate: TranslateService) {
    // Initialize language options
    this.translate.addLangs(['en', 'ar']);
    this.translate.setDefaultLang(localStorage.getItem(BasicsConstance.LANG) || 'en');
    this.translate.use(this.getSelectedLanguage()); // Use the selected language on service initialization
  }

  loadTranslations(...args: Locale[]): void {
    args.forEach((locale) => {
      this.translate.setTranslation(locale.lang, locale.data, true);
      this.langIds.push(locale.lang);
    });
    this.translate.addLangs(this.langIds);
    this.translate.use(this.getSelectedLanguage());
  }

  changeLang(lang: 'ar' | 'en') {
    this.setLanguage(lang);
    this.translate.use(lang);
    location.reload();
  }

  getCurrentLangInfo() {
    const lang = this.getSelectedLanguage();
    this.CurrentLangInfo.Currentlang = lang === 'ar' ? BasicsConstance['AR'] : BasicsConstance['EN'];
    this.CurrentLangInfo.CurrentLangImage =
      lang === 'ar'
        ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png?20231030035225'
        : '../../../assets/media/images/login/USFlag.png';
    return this.CurrentLangInfo;
  }

  getHtmlDirection() {
    const lang = this.getSelectedLanguage();
    const Dir = lang === 'ar' ? 'rtl' : 'ltr';
    this.subject.next(Dir); // Notify components of direction change
    return Dir;
  }

  setLanguage(lang: string) {
    localStorage.setItem(BasicsConstance.LANG, lang);
  }

  getSelectedLanguage = () => localStorage.getItem(BasicsConstance.LANG) || this.translate.getDefaultLang();
}
