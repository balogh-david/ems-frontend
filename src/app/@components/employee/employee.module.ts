import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../../shared/shared.module";
import { EmployeeFormLabelComponent } from "./employee-form/employee-form-label/employee-form-label.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { EmployeeDropdownComponent } from "./employee-list/employee-dropdown/employee-dropdown.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";

import { EmployeeRoutingModule } from "./employee-routing.module";


@NgModule({
  declarations: [
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDropdownComponent,
    EmployeeFormLabelComponent
  ],
  exports: [
    EmployeeFormLabelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    EmployeeRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmployeeModule {}
