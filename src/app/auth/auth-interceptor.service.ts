import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";


@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authservice: AuthService,
    private store:Store<fromApp.Appstate>) {}

  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   return this.authservice.user.pipe(
  //     take(1),
  //     exhaustMap((user) => {
  //       if (!user) {
  //         return next.handle(req);
  //       }
  //       const modifiedReq = req.clone({
  //         params: new HttpParams().set("auth", user.token),
  //       });
  //       return next.handle(modifiedReq);
  //     })
  //   );
  // } 
  //using service
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState =>{
        return authState.user;
      }),
      exhaustMap((user) => {
        if (!user) {
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set("auth", user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
