import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { apiUrl } from "../../../environments/environment";
import { StatementType } from "../../models/statement.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

  permissionCounts!: StatementType[];

  constructor(private http: HttpClient,
              private toastr: ToastrService,
              private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.http.get<StatementType[]>(`${apiUrl}/users/statements`)
      .subscribe(
        (data: StatementType[]) => {
          this.permissionCounts = data;
        }, () => {
          this.toastr.error(this.translateService.instant("APP.MESSAGES.UNKNOWN"));
        }
      );
  }

}
