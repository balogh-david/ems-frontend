import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppGuard } from "../../core/guards/app.guard";
import { RouteGuard } from "../../core/guards/route.guard";
import { Permission } from "../../models/permission.model";
import { ProfileFormComponent } from "./profile-form/profile-form.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileFormComponent,
    canActivate: [AppGuard, RouteGuard],
    data: {
      expectedPermission: Permission.EMPLOYEE
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
