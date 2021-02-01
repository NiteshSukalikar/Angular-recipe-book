import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { map, tap, take, exhaustMap } from "rxjs/operators";
import { ReturnStatement } from "@angular/compiler";
import { Ingredients } from "./ingredient.model";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class DataStorageService {
  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipe() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient
      .put(
        "https://ng-course-recipe-book-7cba6-default-rtdb.firebaseio.com/recipes.json",
        recipes
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }

  fetchRecipe() {
    return this.httpClient
      .get<Recipe[]>(
        "https://ng-course-recipe-book-7cba6-default-rtdb.firebaseio.com/recipes.json"
      )
      .pipe(
        map((recipes) => {
          return recipes.map((rec) => {
            console.log({
              ...rec,
              title: rec.name,
            });

            return {
              ...rec,
              ingredients: rec.ingredients ? rec.ingredients : [],
            };
          });
        }),
        tap((data) => {
          this.recipeService.setRecipes(data);
        })
      );
  }
}
