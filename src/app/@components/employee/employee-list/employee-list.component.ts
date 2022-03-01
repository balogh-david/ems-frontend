import { Component } from "@angular/core";
import { UserType } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.scss"]
})
export class EmployeeListComponent {

  /**
   * Alkalmazottak listája.
   * @type {UserType[]}
   */
  employees: UserType[] = [];

  start: number = 0;
  to: number = 10;

  constructor(private userService: UserService) {
    this.fetchData(this.start, this.to);
  };

  fetchData(start: number, to: number) {
    this.userService.fetchData(start, to)
      .subscribe((data: UserType[]) => {
        this.employees = data;
      });
  }

  /**
   * @param {string} email - Az alkalmazott címe.
   * @return string - {@link HTMLLinkElement} href értéke.
   */
  mailTo(email: string): string {
    return `mailto:${email}`;
  }

  callEmit(status: boolean) {
    if (status) {
      this.fetchData(this.start, this.to);
    }
  }
}
