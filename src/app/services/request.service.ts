import { Injectable, Injector } from "@angular/core";
import { BaseService } from "../core/services/base.service";
import { RequestType } from "../models/request.model";

/**
 * A {@link BaseService} implementációja.
 */
@Injectable({
  providedIn: "root",
})
export class RequestService extends BaseService<RequestType> {
  constructor(protected injector: Injector) {
    super(injector, "requests");
  }
}
