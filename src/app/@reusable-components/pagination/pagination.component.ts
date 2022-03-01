import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent {

  from: number = 0;
  howMuch: number = 10;
  disableClasses = ["pe-none", "text-muted"];

  @Input() numberOfRows!: number;
  @Output() methodCall = new EventEmitter();

  constructor() { }

  /**
   * Pagination lapozása jobbra.
   */
  rightScroll() {
    this.from += 10;
    this.methodCall.emit({
      from: this.from,
      howMuch: this.howMuch
    });
  }

  /**
   * Pagination lapozása balra.
   */
  leftScroll() {
    this.from -= 10;
    this.methodCall.emit({
      from: this.from,
      howMuch: this.howMuch
    });
  }
}
