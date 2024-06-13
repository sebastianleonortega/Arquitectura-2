import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let cloneReq = req;

    if (typeof window !== 'undefined' && window.localStorage && localStorage.getItem("access_token")) {
      const token = localStorage.getItem("access_token");
      cloneReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(cloneReq).pipe(
      finalize(() => {
      })
    );
  }

}
