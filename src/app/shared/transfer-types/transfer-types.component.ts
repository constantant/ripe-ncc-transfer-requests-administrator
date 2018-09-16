import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-transfer-types',
  templateUrl: './transfer-types.component.html'
})
export class TransferTypesComponent {

  @Input()
  type: string;
}
