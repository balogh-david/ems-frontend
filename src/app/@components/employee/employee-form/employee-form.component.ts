import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { sha512 } from "js-sha512";
import { ToastrService } from "ngx-toastr";
import Validation from "../../../core/etc/validator";
import { UserType } from "../../../models/user.model";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html"
})
export class EmployeeFormComponent {

  /**
   * FormGroup alkalmazott hozzáadásához | szerkesztéséhez.
   * @type {FormGroup}
   */
  formGroup!: FormGroup;

  /**
   * Alkalmazott azonosítója.
   * @default number | undefined
   * @type {number}
   */
  employeeId!: string;

  constructor(private activatedRoute: ActivatedRoute,
              private employeeService: UserService,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private router: Router) {
    this.initForm();

    this.employeeId = this.activatedRoute.snapshot.params.id;
    if (this.employeeId) {
      this.findEmployee(this.employeeId);
    }
  }

  /**
   * @link {formGroup} inicializálása.
   * @type {function}
   * @return {void}
   */
  initForm(employee?: UserType): void {
    this.formGroup = new FormGroup({
      name: new FormControl(employee?.name ?? null, [
        Validators.required,
      ]),
      userName: new FormControl(employee?.userName ?? null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      phoneNumber: new FormControl(employee?.phoneNumber ?? null, [
        Validators.required,
      ]),
      daysOff: new FormControl(15, [
        Validators.required,
      ]),
      position: new FormControl(employee?.position ?? null, [
        Validators.required,
      ]),
      email: new FormControl(employee?.email ?? null, [
        Validators.required,
        Validators.pattern(Validation.emailPattern),
      ]),
      permission: new FormControl("EMPLOYEE", [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.pattern(Validation.passwordPattern),
      ]),
      repeatPassword: new FormControl(null),
    }, {
      validators: [
        Validation.match("password", "repeatPassword"),
      ]
    });
  };

  /**
   * Alkalmazott lekérése id szerint.
   * @param id - azonosítója.
   * @return {void}
   */
  findEmployee(id: string): void {
    this.employeeService.findBy(id)
      .subscribe(
        (employee: UserType) => {
          this.initForm(employee);
        }
      );
  };

  onSubmit() {
    if (this.formGroup.valid) {
      if (this.employeeId) {
        let user = this.formGroup.getRawValue();
        if (user.password) {
          user.password = sha512(user.password);
        }
        this.employeeService.update(user, this.employeeId)
          .subscribe(
            () => {
              this.toastr.success(this.translateService.instant("APP.MESSAGES.SUCCESS_UPDATE"));
              this.router.navigate(["../"]).then();
            }, () => {
              this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
            }
          );
      } else {
        let user = this.formGroup.getRawValue();
        user.id = localStorage.getItem("id");
        user.password = sha512(user.password);
        this.employeeService.create(user)
          .subscribe(
            () => {
              this.toastr.success(this.translateService.instant("APP.MESSAGES.SUCCESS"));
              this.router.navigate(["../"]).then();
            }, () => {
              this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
            }
          );
      }
    } else {
      this.toastr.warning(this.translateService.instant("APP.ERRORS.INVALID_FIELDS"));
    }
  }

}
