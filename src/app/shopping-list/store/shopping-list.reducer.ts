import { Action } from "@ngrx/store";
import { Ingredients } from "src/app/shared/ingredient.model";
import * as ShoopingListAction from "../store/shopping-list.action";

export interface State {
  ingredients: Ingredients[];
  editIngredient: Ingredients;
  editIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredients("Apples", 5), new Ingredients("Tomatoes", 15)],
  editIngredient: null,
  editIngredientIndex: -1,
};

export function ShoppingListReducer(
  state: State = initialState,
  action: ShoopingListAction.ShoppingListAction
) {
  switch (action.type) {
    case ShoopingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    //...operator pulls out all propertise of old state and add this prop to the new state
    //Hence, we have new object with old data
    //inshrt copy of the old state
    //now i want to override the ingredients prop

    case ShoopingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };

    case ShoopingListAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoopingListAction.DELETE_INGREDIENT:
       return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };

    case ShoopingListAction.START_EDIT:
      return {
        ...state,
        editIngredientIndex: action.payload,
        editIngredient: { ...state.ingredients[action.payload] },
      };

    case ShoopingListAction.STOP_EDIT:
      return {
        ...state,
        editIngredientIndex: -1,
        editIngredient: null,
      };

    default:
      return state;
  }
}
