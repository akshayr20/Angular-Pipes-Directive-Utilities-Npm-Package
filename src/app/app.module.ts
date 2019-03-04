import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PipeModule } from 'pipes';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PipeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
