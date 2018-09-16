import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransfersApiService } from './transfers-api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor } from './api.interceptor';
import { TransferTypesComponent } from './transfer-types/transfer-types.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    TransferTypesComponent
  ],
  declarations: [
    TransferTypesComponent
  ],
  providers: [
    TransfersApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {
}
