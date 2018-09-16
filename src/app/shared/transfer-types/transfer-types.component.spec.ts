import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTypesComponent } from './transfer-types.component';

describe('TransferTypesComponent', () => {
  let component: TransferTypesComponent;
  let fixture: ComponentFixture<TransferTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
