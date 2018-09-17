import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFormComponent } from './transfer-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TransfersApiService } from '../shared/transfers-api.service';

describe('TransferFormComponent', () => {
  let component: TransferFormComponent;
  let fixture: ComponentFixture<TransferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransferFormComponent],
      providers: [
        {
          provide: FormBuilder,
          useValue: {
            group: () => ({})
          }
        },
        {
          provide: TransfersApiService,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
