import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { sha512 } from "js-sha512";
import { apiUrl } from "../../../../environments/environment";
import { LoginResponse } from "../../../models/login.response.model";
import { Permission } from "../../../models/permission.model";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent {

  /**
   * Bejelentkezéshez szükséges form.
   * @type {FormGroup}
   */
  formGroup!: FormGroup;

  invalidUsernameOrPassword: boolean = false;
  unknownError: boolean = false;

  constructor(private http: HttpClient, private router: Router) {
    this.initForm();
  }

  private initForm() {
    this.formGroup = new FormGroup({
      userName: new FormControl(null, [
        Validators.required,
      ]),
      password: new FormControl(null, [
        Validators.required,
      ])
    });
  };

  /**
   * Bejelentkezést megvalosító függvény.
   * @return {void}
   */
  onSubmit(): void {
    let user = {
      userName: this.formGroup.get("userName")?.value,
      password: sha512(this.formGroup.get("password")?.value)
    };

    this.http.post<LoginResponse>(`${apiUrl.substring(0, apiUrl.length - 5)}/auth/login`, user)
      .subscribe(
        (response: LoginResponse) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("permission", Permission[response.permission]);
          localStorage.setItem("userName", response.userName);
          localStorage.setItem("id", response.id);
          localStorage.setItem("tokenCreationDate", response.tokenCreationDate.toString());
          this.router.navigate(["../../employees"]).then();
        }, (error: HttpErrorResponse) => {
          console.log(error);
          if (error.status == 500) {
            this.invalidUsernameOrPassword = true;
          } else {
            this.unknownError = true;
          }
        }
      );
  };

}
