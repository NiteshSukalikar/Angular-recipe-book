import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Ingredients } from "src/app/shared/ingredient.model";

import * as ShoopingListAction from "../store/shopping-list.action";
import * as fromApp from "../../store/app.reducer";

@Component({
  selector: "app-shopping-edit",
  templateUrl: "./shopping-edit.component.html",
  styleUrls: ["./shopping-edit.component.css"],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild("nameInput") NameInputRef: ElementRef;
  // @ViewChild("amountInput") amountInputRef: ElementRef;

  @ViewChild("f") slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItem: Ingredients;
  editItemIndex: any;

  constructor(private store: Store<fromApp.Appstate>) {}

  ngOnInit() {
    this.subscription = this.store
    .select('shoppingList')
    .subscribe(stateData => {
      if (stateData.editIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmitItem(form: NgForm) {
    // const IngName = this.NameInputRef.nativeElement.value;
    // const IngAmount = this.amountInputRef.nativeElement.value;

    const value = form.value;
    const newIngredient = new Ingredients(value.name, value.amount);
    if (this.editMode) {
      // this.slService.updateIngredients(this.editItemIndex, newIngredient);

      this.store.dispatch(
        new ShoopingListAction.UpdateIngredient(newIngredient)
      );
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoopingListAction.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoopingListAction.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new ShoopingListAction.DeleteIngredient());

     //this.slService.deleteIngredients(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoopingListAction.StopEdit());
  }
}
