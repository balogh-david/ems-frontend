import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../../shared/shared.module";
import { EmployeeModule } from "../employee/employee.module";
import { RequestListTableViewComponent } from "./request-list/request-list-table-view/request-list-table-view.component";
import { RequestListTableComponent } from "./request-list/request-list-table/request-list-table.component";
import { RequestListComponent } from "./request-list/request-list.component";

import { RequestRoutingModule } from "./request-routing.module";
import { RequestFormComponent } from './request-form/request-form.component';


@NgModule({
  declarations: [
    RequestListComponent,
    RequestListTableComponent,
    RequestListTableViewComponent,
    RequestFormComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule,
    SharedModule,
    EmployeeModule,
  ]
})
export class RequestModule {}
