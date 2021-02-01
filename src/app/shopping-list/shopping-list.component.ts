import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ShoppingListService } from "./shopping-list.service";
import { Ingredients } from "../shared/ingredient.model";
import { Store } from "@ngrx/store";
import { State } from "./store/shopping-list.reducer";
import * as fromApp from "../store/app.reducer";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.action";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
  providers: [],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredients[] }>;
  private igChangeSub: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromApp.Appstate>
  ) {}

  ngOnInit() {
    this.ingredients = this.store.select("shoppingList");
    console.log(this.ingredients);

    // this.ingredients = this.shoppingListService.getIngredients();
    // this.igChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredient) => {
    //     this.ingredients = ingredient;
    //   }
    // );
  }

  ngOnDestroy() {
    // this.igChangeSub.unsubscribe();
  }

  onEditItem(index) {
    //this.shoppingListService.startedEditing.next(index);

    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
