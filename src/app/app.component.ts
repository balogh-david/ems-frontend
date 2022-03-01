import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LocalStorageService } from "./services/local-storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  constructor(public localStorageService: LocalStorageService,
              private translateService: TranslateService) {
    this.translateService.currentLang = localStorage.getItem("lang") ?? "en";
  }

}
