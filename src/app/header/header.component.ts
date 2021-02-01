import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  private userSub: Subscription;
  isAuthenicated = false;

  constructor(
    private dataStrorage: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.Appstate>
  ) {}

  onSaveData() {
    this.dataStrorage.storeRecipe();
  }
  ngOnInit() {
    // this.userSub = this.authService.user.subscribe((user) => {
    //   this.isAuthenicated = !!user;
    // });
    //using services

    this.userSub = this.store
      .select("auth")
      .pipe(
        map((authUser) => {
          return authUser.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenicated = !!user;
      });
    //using ngrx
  }

  onFetchData() {
    this.dataStrorage.fetchRecipe().subscribe();
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
