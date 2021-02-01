import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appDropdownDirective]",
})
export class DropdownDirective {
  @HostBinding("class.open") isOpen = false;

  @HostListener("click") toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // @HostListener("document:click" , ['$event']) toggleOpen(event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }
  // if you want to close dropdown if you click anywhere on screen

  constructor(private elRef: ElementRef) {}
}
