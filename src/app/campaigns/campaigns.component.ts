import { Campaign } from './../campaigns';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})


export class CampaignsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'keywords', 'bidAmount', 'fund', 'status', 'town', 'radius'];
  data: Campaign[] = [];
  emeraldAccountFunds = 1000000;
  isLoadingResults = true;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCampaigns()
      .subscribe(res => {
        this.data = res;
        console.log('###');
        console.log(this.data);
        this.data.forEach(element => {
          this.emeraldAccountFunds -= element.fund;
        });
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }


}
