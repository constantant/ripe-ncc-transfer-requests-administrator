import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransfersApiService } from '../shared/transfers-api.service';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss']
})
export class TransferFormComponent implements OnInit {

  @Input()
  data: ITransfer;

  form: FormGroup = this.formBuilder.group({
    ipBlock: ['', Validators.required],
    fromCompany: ['', Validators.required],
    toCompany: ['', Validators.required],
    date: ['', Validators.required],
    transferType: ['', Validators.required]
  });

  transferTypes$ = this.apiService.transferTypes$;

  ipRanges$ = this.apiService.ipRanges$;

  constructor(private formBuilder: FormBuilder,
              private apiService: TransfersApiService) {
  }

  ngOnInit() {
    if (!this.data) {
      return;
    }
    this.form.patchValue(this.data, {emitEvent: false});
  }
}
