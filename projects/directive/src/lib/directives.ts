import { Directive, EventEmitter, Output, Input, ElementRef, HostListener } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[diClickedOutside]'
})
export class ClickedOutsideDirective {
  @Output() public clickOutside = new EventEmitter<MouseEvent>();
  @Input() public disabled = false;
  private isLoaded = false;
  private clickEvent$: Subject<MouseEvent> = new Subject<MouseEvent>();
  private subscription: Subscription;
  private clickTimer: any;

  constructor(private elementRef: ElementRef) {
    // WORKAROUND: Prevent catching the initial click
    clearTimeout(this.clickTimer);
    this.clickTimer = setTimeout(() => {
      this.isLoaded = true;
    }, 100);

    this.subscription = this.clickEvent$.pipe(debounceTime(300)).subscribe(event => {
      this.clickOutside.emit(event);
    });
  }

  @HostListener('document:click', ['$event', '$event.target'])
  @HostListener('document:touchstart', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!this.isLoaded || !targetElement || this.disabled) {
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickEvent$.next(event);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.clickTimer);
    this.subscription.unsubscribe();
    this.clickOutside.unsubscribe();
  }
}
