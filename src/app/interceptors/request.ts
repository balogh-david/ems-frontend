import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { LocalStorageService } from "../services/local-storage.service";

export class RequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let localStorageService: LocalStorageService = new LocalStorageService();
    if (localStorageService.loadToken() && localStorageService.loadUsername() && localStorageService.loadPermission()) {
      req = req.clone({
        setHeaders: {
          "token": String(localStorageService.loadToken()),
          "userName": String(localStorageService.loadUsername()),
          "permission": String(localStorageService.loadPermission())
        }
      });
    }

    req = req.clone({
      setHeaders: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
      }
    });

    return next.handle(req);
  }

}
