import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable()
export class TransfersApiService {

  transferTypes$ = this.httpClient.get<string[]>(`/api/transfertypes`).pipe(shareReplay());

  ipRanges$ = this.httpClient.get<string[]>(`/api/ipranges`).pipe(shareReplay());

  constructor(private httpClient: HttpClient) {
  }

  getTransfers(): Observable<ITransfer[]> {
    return this.httpClient.get<ITransfer[]>(`/api/transfers`);
  }

  getTransfer(transferId: number): Observable<ITransfer> {
    return this.httpClient.get<ITransfer>(`/api/transfers/${transferId}`);
  }

  addTransfer(transferItem: ITransfer) {
    return this.httpClient.post(`/api/transfers`, transferItem);
  }

  updateTransfer(transferId: number, transferItem: ITransfer) {
    return this.httpClient.put(`/api/transfers/${transferId}`, transferItem);
  }

  deleteTransfer(transferId: number) {
    return this.httpClient.delete(`/api/transfers/${transferId}`);
  }
}
