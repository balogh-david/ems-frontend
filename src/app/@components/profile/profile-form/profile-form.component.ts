import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { sha512 } from "js-sha512";
import { ToastrService } from "ngx-toastr";
import Validation from "../../../core/etc/validator";
import { UserType } from "../../../models/user.model";
import { LocalStorageService } from "../../../services/local-storage.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-profile-form",
  templateUrl: "./profile-form.component.html",
  styleUrls: ["./profile-form.component.scss"]
})
export class ProfileFormComponent implements OnInit {

  /**
   * Formgroup a profil adatok módosításához.
   */
  formGroup!: FormGroup;

  /**
   * Formgroup a jelszó módosításához.
   */
  pwFormGroup!: FormGroup;

  /**
   * Bejelentkezett felhasználó.
   */
  user?: UserType;

  constructor(private localStorageService: LocalStorageService,
              private userService: UserService,
              private toastr: ToastrService,
              private translateService: TranslateService) {
    this.initForm();
  }

  ngOnInit(): void {
    this.findUserByUserName();
  }

  findUserByUserName() {
    this.userService.findByUserName(<string>this.localStorageService.loadUsername())
      .subscribe(
        (user: UserType) => {
          this.user = user;
          this.initForm();
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  }

  /**
   * @link {formGroup} inicializálása.
   * @type {function}
   * @return {void}
   */
  initForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl(this.user?.name ?? null, [
        Validators.required,
      ]),
      userName: new FormControl(this.localStorageService.loadUsername() ?? null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      phoneNumber: new FormControl(this.user?.phoneNumber ?? null, [
        Validators.required,
      ]),
      position: new FormControl(this.user?.position ?? null, [
        Validators.required,
      ]),
      email: new FormControl(this.user?.email ?? null, [
        Validators.required,
        Validators.pattern(Validation.emailPattern),
      ]),
      permission: new FormControl(this.localStorageService.loadPermission(), [
        Validators.required,
      ]),
    });

    this.pwFormGroup = new FormGroup({
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(Validation.passwordPattern),
      ]),
      repeatPassword: new FormControl(null, [
        Validators.required,
      ]),
    }, {
      validators: [
        Validation.match("password", "repeatPassword"),
      ]
    });
  };

  /**
   * Profil adatok módosítása.
   * @return {void}
   */
  onSubmit() {
    if (this.user) {
      this.userService.update(this.formGroup.getRawValue(), this.user?.id)
        .subscribe(
          (data: UserType) => {
            console.log(data);
            this.toastr.success(this.translateService.instant("APP.MESSAGES.SUCCESS_UPDATE"));
          }, () => {
            this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
          }
        );
    }
  }

  /**
   * Jelszó módosítása.
   * @return {void}
   */
  pwOnSubmit() {
    if (this.user) {
      this.user.password = sha512(this.pwFormGroup.get("password")?.value);
      this.userService.update(this.user, this.user.id)
        .subscribe(
          () => {
            this.toastr.success(this.translateService.instant("APP.MESSAGES.SUCCESS_UPDATE"));
            this.pwFormGroup.reset();
          }, () => {
            this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
          }
        );
    }
  }

}
