import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent, EFields, EOrderDirection } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TransfersApiService } from './shared/transfers-api.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let apiService: TransfersApiService;
  let getTransfersSpy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        {
          provide: TransfersApiService, useValue: {
            getTransfers: () => of()
          }
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    apiService = fixture.debugElement.injector.get(TransfersApiService);
    getTransfersSpy = spyOn(apiService, 'getTransfers');
    getTransfersSpy.and.returnValue(of([{
      'id': 1,
      'date': '2018-08-23T11:17:48.423',
      'fromCompany': 'From Company1',
      'ipBlock': '43.66.71.122/11',
      'toCompany': 'To Company 12',
      'transferType': 'MergerOrAcquisition'
    }, {
      'id': 2,
      'date': '2018-08-23T11:17:48.424',
      'fromCompany': 'From Company2',
      'ipBlock': '49.14.129.248/12',
      'toCompany': 'To Company 22',
      'transferType': 'Policy'
    }, {
      'id': 3,
      'date': '2018-08-23T11:17:48.424',
      'fromCompany': 'From Company3',
      'ipBlock': '28.1.69.190/13',
      'toCompany': 'To Company 32',
      'transferType': 'MergerOrAcquisition'
    }]));
  }));
  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));
  it('should be unsorted', async(() => {
    app.transfers$.subscribe((transfers: ITransfer[]) => {
      expect(transfers[0].id).toBe(1);
      expect(transfers[1].id).toBe(2);
      expect(transfers[2].id).toBe(3);
    });
  }));
  it('should be sorted by fromCompany DESC', async(() => {
    app.orderDirection = EOrderDirection.Descending;
    app.orderBy$$.next(EFields.FromCompany);
    app.transfers$.subscribe((transfers: ITransfer[]) => {
      expect(transfers[0].id).toBe(3);
      expect(transfers[1].id).toBe(2);
      expect(transfers[2].id).toBe(1);
    });
  }));
  it('should be sorted by transferType ASC', async(() => {
    app.orderDirection = EOrderDirection.Ascending;
    app.orderBy$$.next(EFields.TransferType);
    app.transfers$.subscribe((transfers: ITransfer[]) => {
      expect(transfers[0].id).toBe(1);
      expect(transfers[1].id).toBe(3);
      expect(transfers[2].id).toBe(2);
    });
  }));
});
