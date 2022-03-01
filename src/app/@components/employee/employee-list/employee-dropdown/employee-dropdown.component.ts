import { Component, EventEmitter, Input, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../../../services/user.service";

@Component({
  selector: "app-employee-dropdown",
  templateUrl: "./employee-dropdown.component.html",
  styleUrls: ["./employee-dropdown.component.scss"]
})
export class EmployeeDropdownComponent {

  @Input()
  id!: string;

  @Output() eventEmitter = new EventEmitter<boolean>();

  constructor(private employeeService: UserService,
              private toastr: ToastrService,
              private translateService: TranslateService) {
  }

  /**
   * Alkalmazott törlése azonosító szerint.
   * @return {void}
   */
  deleteEmployee(): void {
    this.employeeService.deleteBy(this.id)
      .subscribe(
        (response: boolean) => {
          if (response) {
            this.eventEmitter.next(true);
            this.toastr.success(this.translateService.instant("APP.MESSAGES.DELETE"));
          } else {
            this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
          }
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  };

}
