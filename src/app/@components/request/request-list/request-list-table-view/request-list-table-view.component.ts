import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { RequestType } from "../../../../models/request.model";
import { Status } from "../../../../models/status.model";
import { RequestService } from "../../../../services/request.service";

@Component({
  selector: "app-request-list-table-view",
  templateUrl: "./request-list-table-view.component.html"
})
export class RequestListTableViewComponent {

  @Input()
  request!: RequestType;

  @Output()
  eventEmitter = new EventEmitter<any>();

  constructor(private requestService: RequestService,
              private translateService: TranslateService,
              private toastr: ToastrService) {
  }

  updateRequest(status: Status) {
    this.request.status = status;
    this.requestService.update(this.request, this.request.id)
      .subscribe(
        () => {
          this.toastr.success(this.translateService.instant("APP.MESSAGES.SUCCESS"));
          this.eventEmitter.emit("");
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  }

}
