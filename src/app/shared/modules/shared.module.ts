import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from "../components/search/search.component";
import { PaginationComponent } from '../components/pagination/pagination.component';
import { PaginationSizeComponent } from '../components/pagination-size/pagination-size.component';


@NgModule({
  declarations: [PaginationComponent, PaginationSizeComponent, SearchComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SearchComponent,
    PaginationComponent, 
    PaginationSizeComponent
  ]
})
export class SharedModule { }
