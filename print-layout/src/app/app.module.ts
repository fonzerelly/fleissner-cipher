import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BooleanMatrixComponent } from './boolean-matrix/boolean-matrix.component';

@NgModule({
  declarations: [
    AppComponent,
    BooleanMatrixComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
