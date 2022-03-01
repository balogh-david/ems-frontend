import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { sha512 } from "js-sha512";
import { ToastrService } from "ngx-toastr";
import { apiUrl } from "../../../../environments/environment";
import Validation from "../../../core/etc/validator";
import { Permission } from "../../../models/permission.model";
import { UserType } from "../../../models/user.model";

@Component({
  selector: "app-register-page",
  templateUrl: "./register-page.component.html",
  styleUrls: ["./register-page.component.scss"]
})
export class RegisterPageComponent {

  /**
   * Regsztrációhoz szükséges form.
   * @type {FormGroup}
   */
  formGroup!: FormGroup;

  constructor(private http: HttpClient,
              private router: Router,
              private toastR: ToastrService,
              private translateService: TranslateService) {
    this.initForm();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [
        Validators.required,
      ]),
      phoneNumber: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(Validation.passwordPattern),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(Validation.emailPattern),
      ]),
      permission: new FormControl(Permission.COMPANY, [
        Validators.required,
      ]),
    }, {
      validators: Validation.match("password", "repeatPassword"),
    });
  };

  /**
   * Regisztrációt megvalosító függvény.
   * @return {void}
   */
  onSubmit(): void {
    if (this.formGroup.valid) {
      let user = this.formGroup.getRawValue();
      user.password = sha512(user.password);
      this.http.post<UserType>(`${apiUrl.substring(0, apiUrl.length - 5)}/auth/registration`, user)
        .subscribe(
          () => {
            this.toastR.success(this.translateService.instant("APP.MESSAGES.REG"));
            this.router.navigate(["auth/login"]).then();
          }, () => {
            this.toastR.error(this.translateService.instant("APP.ERRORS.INVALID_FIELDS"));
          }
        );
    } else {
      this.toastR.error(this.translateService.instant("APP.ERRORS.INVALID_FIELDS"));
    }

  }
}
