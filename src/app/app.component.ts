import { Component } from '@angular/core';
import { TransfersApiService } from './shared/transfers-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

export enum EModalTypes {
  None,
  Add,
  Edit,
  Delete
}

export enum EFields {
  IpBlock = 'ipBlock',
  FromCompany = 'fromCompany',
  ToCompany = 'toCompany',
  Date = 'date',
  TransferType = 'transferType'
}

export enum EOrderDirection {
  Ascending,
  Descending
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  modalTypes = EModalTypes;
  fields = EFields;

  trigger$$: BehaviorSubject<null> = new BehaviorSubject(null);

  transfers$: Observable<ITransfer[]> = this.trigger$$.pipe(
    switchMap(() => this.apiService.getTransfers()),
    switchMap((transfers: ITransfer[]) => this.orderBy$$.pipe(
      map((field: EFields) => {
        if (!field) {
          return transfers;
        }
        const sorting = (f: EFields) => (a, b) => {
          const isASC = this.orderDirection === EOrderDirection.Ascending;
          const x = a[f].toLowerCase();
          const y = b[f].toLowerCase();
          if (x < y) {
            return isASC ? -1 : 1;
          }
          if (x > y) {
            return isASC ? 1 : -1;
          }
          return 0;
        };
        return transfers.slice().sort(sorting(field));
      })
    ))
  );

  modalState$$: BehaviorSubject<EModalTypes> = new BehaviorSubject(EModalTypes.None);

  modalData$$: BehaviorSubject<ITransfer> = new BehaviorSubject(null);

  orderBy$$: BehaviorSubject<EFields> = new BehaviorSubject(null);

  orderDirection = EOrderDirection.Ascending;

  constructor(private apiService: TransfersApiService) {
  }

  showAddForm() {
    this.modalState$$.next(EModalTypes.Add);
  }

  showUpdateForm(transferItem: ITransfer) {
    this.modalData$$.next(transferItem);
    this.modalState$$.next(EModalTypes.Edit);
  }

  showDeleteForm(transferItem: ITransfer) {
    this.modalData$$.next(transferItem);
    this.modalState$$.next(EModalTypes.Delete);
  }

  closeModal() {
    this.modalState$$.next(EModalTypes.None);
  }

  addTransfer(transferItem: ITransfer) {
    this.apiService.addTransfer(transferItem).subscribe(() => {
      this.trigger$$.next(null);
      this.modalState$$.next(EModalTypes.None);
    });
  }

  updateTransfer(transferId: number, transferItem: ITransfer) {
    this.apiService.updateTransfer(transferId, transferItem).subscribe(() => {
      this.modalState$$.next(EModalTypes.None);
    });
  }

  deleteTransfer(transferId: number) {
    this.apiService.deleteTransfer(transferId).subscribe(() => {
      this.modalState$$.next(EModalTypes.None);
    });
  }

  orderByClass(field: EFields) {
    if (this.orderBy$$.getValue() !== field) {
      return;
    }
    return `app-order-${this.orderDirection === EOrderDirection.Descending ? 'descending' : 'ascending'}`;
  }

  orderBy(field: EFields) {
    if (this.orderBy$$.getValue() === field) {
      this.orderDirection = this.orderDirection === EOrderDirection.Descending ? EOrderDirection.Ascending : EOrderDirection.Descending;
      this.orderBy$$.next(field);
      return;
    }
    this.orderDirection = EOrderDirection.Ascending;
    this.orderBy$$.next(field);
  }
}
