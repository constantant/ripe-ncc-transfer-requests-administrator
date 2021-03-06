import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { TransferFormComponent } from './transfer-form/transfer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TransferFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
