import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule],
})
export class TranslationModule { }
