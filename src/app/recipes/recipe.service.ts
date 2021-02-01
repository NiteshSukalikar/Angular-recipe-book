import { Injectable, EventEmitter } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs";
import { Ingredients } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import * as ShoopingListAction from "../shopping-list/store/shopping-list.action";
import * as fromApp from "../store/app.reducer";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Chicken Tandoori",
  //     "A spicy and hot",
  //     "https://www.seriouseats.com/2019/07/20190618-grilled-turkish-chicken-wings-vicky-wasik-13.jpg",
  //     [
  //       new Ingredients("Meat", 10),
  //       new Ingredients("Tomatoes", 10),
  //       new Ingredients("Garlic", 10),
  //       new Ingredients("Onion", 10),
  //     ]
  //   ),
  //   new Recipe(
  //     "Grilled Chicken",
  //     "Grilled with bbq",
  //     "https://realfood.tesco.com/media/images/Ritas-enchiladas-recipe-1400x919-1c7ff22b-ea5e-44cf-9ada-d7b04420002f-0-1400x919.jpg",
  //     [
  //       new Ingredients("Meat", 10),
  //       new Ingredients("Tomatoes", 10),
  //       new Ingredients("Garlic", 10),
  //       new Ingredients("Onion", 10),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[] = [];
  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.Appstate>
  ) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredients[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoopingListAction.AddIngredients(ingredients));
  }

  addRecipe(recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  } 

  updateRecipe(index, newRecipe) {
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
