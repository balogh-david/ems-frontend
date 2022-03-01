import { AfterViewInit, Component, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements AfterViewInit {

  /**
   * Oldalsó menü szélessége.
   * @type {number}
   */
  menuWidth: number = 225;

  constructor(private elementRef: ElementRef) {
    if (window.innerWidth <= 642) {
      this.menuWidth = 0;
    }
  }

  ngAfterViewInit(): void {
    const toggle = this.elementRef.nativeElement.ownerDocument.querySelector(".fa-bars");
    fromEvent(toggle, "click")
      .subscribe(() => {
        switch (this.menuWidth) {
          case 225:
            this.menuWidth = 0;
            break;
          default:
            this.menuWidth = 225;
        }
      });
  }

}
