import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import { ActionReducerMap } from "@ngrx/store";

export interface Appstate {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.State;
}

export const appReducer : ActionReducerMap<Appstate> = {
  shoppingList: fromShoppingList.ShoppingListReducer,
  auth: fromAuth.AuthReducer,
};
