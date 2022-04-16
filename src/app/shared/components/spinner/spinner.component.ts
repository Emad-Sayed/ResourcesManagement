import { Component, OnInit } from '@angular/core';
import { CoreService } from '../../services/core/core.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isSpinnerLoading: boolean;

  constructor(private coreService: CoreService) {
    this.coreService.spinnerSubject.subscribe(
      (data: boolean) => {
        this.isSpinnerLoading = data;
      }
    )
  }

  ngOnInit() {
  }

}