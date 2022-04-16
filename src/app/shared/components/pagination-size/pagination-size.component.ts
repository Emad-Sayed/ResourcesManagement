import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination-size',
  templateUrl: './pagination-size.component.html',
  styleUrls: ['./pagination-size.component.scss']
})
export class PaginationSizeComponent implements OnInit {
  currentPageSize:number;
  @Output() selectedPageSizeEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  pageSelected(pageSize){
    this.currentPageSize=pageSize;
    this.selectedPageSizeEvent.emit(pageSize);
  }
}
