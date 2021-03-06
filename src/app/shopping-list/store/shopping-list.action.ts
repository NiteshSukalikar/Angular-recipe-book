import { Action } from "@ngrx/store";
import { Ingredients } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = "[shopping list] ADD_INGREDIENT";
export const ADD_INGREDIENTS = "[shopping list] ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "[shopping list] UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "[shopping list] DELETE_INGREDIENT";
export const START_EDIT = "[shopping list] START_EDIT";
export const STOP_EDIT = "[shopping list] STOP_EDIT";

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredients) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredients[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredients) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}
export type ShoppingListAction =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
