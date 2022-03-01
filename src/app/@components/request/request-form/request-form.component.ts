import { DatePipe } from "@angular/common";
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { UserType } from "../../../models/user.model";
import { LocalStorageService } from "../../../services/local-storage.service";
import { RequestService } from "../../../services/request.service";
import { UserService } from "../../../services/user.service";

@Component({
  selector: "app-request-form",
  templateUrl: "./request-form.component.html",
  styleUrls: ["./request-form.component.scss"],
  providers: [DatePipe]
})
export class RequestFormComponent implements OnInit {

  /**
   * Form a kérés felvételéhez.
   * @type {FormGroup}
   */
  formGroup!: FormGroup;

  @ViewChild("dayOff")
  dayOff!: ElementRef;

  @Output()
  eventEmitter = new EventEmitter<any>();

  constructor(private datePipe: DatePipe,
              private localStorageService: LocalStorageService,
              private translateService: TranslateService,
              private toastr: ToastrService,
              private requestService: RequestService,
              private userService: UserService) {
    this.initForm();
    this.findUserByUserName();
  }

  ngOnInit(): void {
  }

  /**
   * @link {formGroup} inicializálása.
   * @return {void}
   */
  initForm() {
    this.formGroup = new FormGroup({
      subject: new FormControl("APP.REQUESTS.CREATE.SUBJECTS.OTHER",
        [Validators.required]
      ),
      description: new FormControl(null,
        [Validators.required]
      ),
      creationDate: new FormControl(this.datePipe.transform(Date.now(), "yyyy-MM-dd"),
        [Validators.required]
      ),
      creator: new FormControl(this.localStorageService.loadUsername(),
        [Validators.required]
      ),
      status: new FormControl("Remaining",
        [Validators.required]
      )
    });
  }

  /**
   * Kérés mentése.
   * @return {void}
   */
  onSubmit() {
    if (this.formGroup.valid) {
      this.requestService.create(this.formGroup.getRawValue())
        .subscribe(
          () => {
            this.formGroup.get("description")?.reset();
            this.toastr.success(this.translateService.instant("APP.MESSAGES.SUCCESS"));
            this.eventEmitter.emit("");
          }
        );
    } else {
      this.toastr.warning(this.translateService.instant("APP.ERRORS.INVALID_FIELDS"));
    }
  }

  /**
   * Felhasználó keresése userName alapján.
   */
  findUserByUserName() {
    this.userService.findByUserName(<string>this.localStorageService.loadUsername())
      .subscribe(
        (user: UserType) => {
          if (Number(user.daysOff) == 0) {
            this.dayOff.nativeElement.remove();
          }
          this.initForm();
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  }

}
