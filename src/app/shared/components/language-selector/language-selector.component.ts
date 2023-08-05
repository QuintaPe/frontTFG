import { Component, OnInit, inject } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss'],
    standalone: true,
    imports: [NgClass, NgFor]
})

export class LanguageSelectorComponent implements OnInit {
  showOptions = false;
  lang: string = ''
  langs: string[] = [];
  timeoutRef: any;

  protected translate = inject(TranslateService);

  ngOnInit(): void {
    this.langs = this.translate.getLangs();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.lang = event.lang;
    });
  }

  get filteredLangs() {
    return this.langs.filter((l: string) => l !== this.lang);
  }

  toggleLanguageOptions() {
    clearTimeout(this.timeoutRef);
    if (this.showOptions) {
      this.showOptions = false;
    } else {
      this.showOptions = true;
      this.timeoutRef = setTimeout(() => {
        this.showOptions = false;
      }, 5000);
    }
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    this.lang = lang;
    this.showOptions = false;
    clearTimeout(this.timeoutRef);
  }

}
