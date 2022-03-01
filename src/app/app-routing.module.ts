import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./@components/dashboard/dashboard.component";
import { AppGuard } from "./core/guards/app.guard";
import { RouteGuard } from "./core/guards/route.guard";
import { Permission } from "./models/permission.model";

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    canActivate: [AppGuard, RouteGuard],
    data: {
      expectedPermission: Permission.ADMIN,
    },
  },
  {
    path: "employees",
    loadChildren: () => import("./@components/employee/employee.module")
      .then(m => m.EmployeeModule),
  },
  {
    path: "requests",
    loadChildren: () => import("./@components/request/request.module")
      .then(m => m.RequestModule),
  },
  {
    path: "profile",
    loadChildren: () => import("./@components/profile/profile.module")
      .then(m => m.ProfileModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./@components/auth/auth.module")
      .then(m => m.AuthModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
