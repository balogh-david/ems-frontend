import { Directive, ElementRef, Input } from "@angular/core";
import { Permission, PermissionType } from "../../models/permission.model";
import { LocalStorageService } from "../../services/local-storage.service";

@Directive({
  selector: "[appPermission]"
})
export class AppPermissionDirective {

  constructor(private elementRef: ElementRef, private localStorageService: LocalStorageService) { }

  @Input()
  set appPermission(perm: PermissionType) {
    const expectedPermission: Permission = Permission[perm];
    if (expectedPermission > Number(this.localStorageService.loadPermission())) {
      this.elementRef.nativeElement.remove();
    }
  }
}
