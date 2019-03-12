import { NgModule } from '@angular/core';
import { ClickedOutsideDirective } from './clicked-outside.directive';

@NgModule({
  declarations: [ClickedOutsideDirective],
  exports: [ClickedOutsideDirective]
})
export class DirectiveModule {}
