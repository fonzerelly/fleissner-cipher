import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BooleanMatrixComponent } from './boolean-matrix/boolean-matrix.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EvenSizeSelectorComponent } from './even-size-selector/even-size-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    BooleanMatrixComponent,
    EvenSizeSelectorComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
