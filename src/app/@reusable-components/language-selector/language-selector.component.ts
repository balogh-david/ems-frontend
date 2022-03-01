import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-language-selector",
  templateUrl: "./language-selector.component.html",
  styleUrls: ["./language-selector.component.scss"]
})
export class LanguageSelectorComponent implements OnInit {

  /**
   * Az aktuális nyelv.
   */
  currentLangIndex!: number;

  constructor(private translateService: TranslateService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getLanguage();
    this.router.events.subscribe(() => {
      this.getLanguage();
    });
  }

  private getLanguage() {
    this.currentLangIndex = this.translateService.currentLang == "en" ? 0 : 1;
  }

  /**
   * Az oldal nyelvének beállítása.
   *
   * @param lang az új nyelv.
   */
  setLanguage(lang: string) {
    localStorage.setItem("lang", lang);
    this.translateService.use(lang);
  }

}
