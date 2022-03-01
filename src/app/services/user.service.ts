import { Injectable, Injector } from "@angular/core";
import { BaseService } from "../core/services/base.service";
import { UserType } from "../models/user.model";

/**
 * A {@link BaseService} implementációja.
 */
@Injectable({
  providedIn: "root",
})
export class UserService extends BaseService<UserType> {
  constructor(protected injector: Injector) {
    super(injector, "users");
  }
}
