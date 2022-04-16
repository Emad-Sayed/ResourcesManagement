import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreService } from '../../services/core/core.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchFired = new Subject();
  @Output() searchFiredForBlur = new Subject();

  constructor(private coreService:CoreService) { }

  ngOnInit(): void {
    
  }
  onKeyUp(searchTextValue: string) {
    this.coreService.searchNotifier.next(searchTextValue);
  }


  onBlurEvent(event: any){
    this.searchFiredForBlur.next(event.target.value);
  }
}
