import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { fromEvent } from "rxjs";
import { LocalStorageService } from "../../services/local-storage.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements AfterViewInit {

  /**
   * A #toggle elem referenciája.
   * @type {ElementRef}
   */
  @ViewChild("toggle") toggle!: ElementRef;

  /**
   * Token érvényességének vizsgálata.
   * Érvénytelen token esetén a felhasználó automatikusan kidobódik a fiókból.
   */
  @HostListener("document:click", ["$event"])
  clickout() {
    let date: Date = new Date(localStorage.getItem("tokenCreationDate")!.toString());
    date.setHours(date.getHours() + 24);

    if ((date.getTime() - Date.now()) <= 0) {
      this.onLogout();
    }
  }

  constructor(private router: Router,
              private localStorageService: LocalStorageService,
              private translateService: TranslateService) {}

  ngAfterViewInit(): void {
    fromEvent(this.toggle.nativeElement, "click")
      .subscribe(() => {
        this.toggle.nativeElement.classList.toggle("rotate");
      });
  }

  /**
   * Kijelenetkezést megvalósító függvény.
   * @return {void}
   */
  onLogout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("permission");
    this.router.navigate(["/auth/login"]).then();
  }

}
