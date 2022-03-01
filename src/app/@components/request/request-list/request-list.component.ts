import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { RequestType } from "../../../models/request.model";
import { Status } from "../../../models/status.model";
import { RequestService } from "../../../services/request.service";

@Component({
  selector: "app-request-list",
  templateUrl: "./request-list.component.html",
  styleUrls: ["./request-list.component.scss"]
})
export class RequestListComponent {

  /**
   * Kérések listája.
   * @type {RequestType[]}
   */
  requests: RequestType[] = [];

  from: number = 0;
  to: number = 10;
  activeStatus: string = "Remaining";

  constructor(private requestService: RequestService,
              private translateService: TranslateService,
              private toastr: ToastrService) {
    this.fetchData(this.from, this.to);
  }

  fetchData(from: number, to: number, status: string = "Remaining") {
    this.activeStatus = status;
    this.requestService.fetchData(from, to, status)
      .subscribe(
        (data: RequestType[]) => {
          this.requests = data;
          console.log(this.requests)
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  }

  /**
   * Kérés visszavonása.
   */
  withdrawRequest(request: RequestType) {
    request.status = "Remaining";
    this.requestService.update(request, request.id)
      .subscribe(
        () => {
          this.fetchData(this.from, this.to)
          this.toastr.success(this.translateService.instant("APP.MESSAGES.WITHDRAW"));
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  }

  acceptEmit() {
    this.fetchData(this.from, this.to);
  }

}
