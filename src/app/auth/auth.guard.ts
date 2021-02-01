import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.Appstate>
  ) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.user.pipe(
  //     map((user) => {
  //       return !!user;
  //     })
  //   );
  // } using services

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select("auth").pipe(
      take(1),
      map(authState =>{
        return authState.user;
      }),
      map((user) => {   
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
      })
    );
  }

  //using ngrx
}
