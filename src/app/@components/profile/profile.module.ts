import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../../shared/shared.module";
import { EmployeeModule } from "../employee/employee.module";
import { ProfileFormComponent } from "./profile-form/profile-form.component";
import { ProfileRoutingModule } from "./profile-routing.module";

@NgModule({
  declarations: [
    ProfileFormComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    EmployeeModule,
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule {}
