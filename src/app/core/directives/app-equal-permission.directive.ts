import { Directive, ElementRef, Input } from "@angular/core";
import { Permission, PermissionType } from "../../models/permission.model";
import { LocalStorageService } from "../../services/local-storage.service";

@Directive({
  selector: "[appEqualPermission]"
})
export class AppEqualPermissionDirective {

  constructor(private elementRef: ElementRef, private localStorageService: LocalStorageService) { }

  @Input()
  set appEqualPermission(perm: PermissionType) {
    const expectedPermission: Permission = Permission[perm];
    if (expectedPermission != Number(this.localStorageService.loadPermission())) {
      this.elementRef.nativeElement.remove();
    }
  }

}
