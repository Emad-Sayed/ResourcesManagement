import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() currenPage: number;
  PagesActualLength: PageView[] = [];
  pagesLengthView: PageView[] = [];
  @Input() set totalPagesSize(val: number) {
    this.PagesActualLength = new Array(val);
    this.pagesLengthView = [];
    this.getPreparedView();
  }
  @Output() selectedPageEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  getPreparedView() {
    
    if (this.PagesActualLength.length < 5) {
      this.fillViewPageObject(this.PagesActualLength.length);
    }
    else {
      this.fillViewPageObject(5);
    }
  }
  fillViewPageObject(length) {
    for (let i = 0; i < length; i++) {
      this.pagesLengthView.push(new PageView(i + 1));
    }
  }
  pageSelected(pageNumber) {
    if (pageNumber > 0 && pageNumber <= this.PagesActualLength.length) {
      if (pageNumber == this.pagesLengthView[this.pagesLengthView.length - 1].Page && pageNumber < this.PagesActualLength.length) {
        this.pagesLengthView.push(new PageView(pageNumber + 1));
        this.pagesLengthView.splice(0, 1);
      }
      if (pageNumber == this.pagesLengthView[0].Page && pageNumber > 1) {
        this.pagesLengthView.unshift(new PageView(this.pagesLengthView[0].Page - 1));
        this.pagesLengthView.splice(-1, 1);
      }
      this.currenPage = pageNumber;
      this.selectedPageEvent.emit(pageNumber);
    }
  }
}
class PageView {
  public constructor(page) {
    this.Page = page;
  }
  Page: number;
}
