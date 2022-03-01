import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppGuard } from "../../core/guards/app.guard";
import { RouteGuard } from "../../core/guards/route.guard";
import { Permission } from "../../models/permission.model";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { EmployeeListComponent } from "./employee-list/employee-list.component";

const routes: Routes = [
  {
    path: "",
    component: EmployeeListComponent,
    canActivate: [AppGuard, RouteGuard],
    data: {
      expectedPermission: Permission.EMPLOYEE,
    }
  },
  {
    path: "add",
    component: EmployeeFormComponent,
    canActivate: [AppGuard, RouteGuard],
    data: {
      expectedPermission: Permission.COMPANY,
    }
  },
  {
    path: "edit/:id",
    component: EmployeeFormComponent,
    canActivate: [AppGuard, RouteGuard],
    data: {
      expectedPermission: Permission.COMPANY,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {}
