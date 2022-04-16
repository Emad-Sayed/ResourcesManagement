import { Component, OnInit } from '@angular/core';
import { Resource } from '../../Model/resource';
import { ResourceService } from '../../Services/resource.service';
import { Subscription, interval } from 'rxjs';
import { CoreService } from 'src/app/shared/services/core/core.service';
import { debounce } from 'rxjs/operators';
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.scss']
})
export class ResourceViewComponent implements OnInit {
  resources:Resource[];
  pagesTotalNumber:number;
  subscription:Subscription;
  query={roles:"RESOURCE",pageNumber:1,pageSize:5}
  constructor(private resourceService:ResourceService,private headerService:HeaderService,private coreService:CoreService) { }

  ngOnInit() {
    this.headerService.changeTitle.next("Resources");
    this.headerService.setCalendarState('off');
    this.searchSubscription();
    this.getResources();
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  searchSubscription(){
    this.subscription=this.coreService.searchNotifier.pipe(
      debounce(() => interval(1000))).subscribe(
      data=>{
        this.query['keyWord']=data;
        this.getResources();
      }
    )
  }
  getResources(){
    this.resourceService.getResources(this.query).subscribe(
      data=>{
        this.resources=data['data'];
        this.pagesTotalNumber=data['pagesTotalNumber'];
      }
    )
  }
  onChangePage(pageNumber){
    this.query.pageNumber=pageNumber;
    this.getResources();
  }
  onChangeSize(pageSize){
    this.query.pageSize=pageSize;
    this.getResources();
  }
}
