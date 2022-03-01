import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { Permission } from "../../models/permission.model";
import { LocalStorageService } from "../../services/local-storage.service";

@Injectable({
  providedIn: "root"
})
export class AppGuard implements CanActivate {

  constructor(private localStorageService: LocalStorageService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorized(route);
  };

  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const expectedPermission: Permission = route.data.expectedPermission;
    return expectedPermission <= Number(this.localStorageService.loadPermission());
  }
}
