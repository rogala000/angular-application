import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Campaign } from '../campaigns';

@Component({
  selector: 'app-campaigns-detail',
  templateUrl: './campaigns-detail.component.html',
  styleUrls: ['./campaigns-detail.component.css']
})
export class CampaignsDetailComponent implements OnInit {
  campaign: Campaign = { id: null, name: '', keywords: '', bidAmount: null, fund: null, status: '', town: '', radius: null };
  isLoadingResults = true;
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }
  ngOnInit() {
    this.getCampaignDetails(this.route.snapshot.params.id);
  }
  getCampaignDetails(id: number) {
    this.api.getCampaign(id)
      .subscribe(data => {
        this.campaign = data;
        console.log(id);
        console.log(this.campaign);
        this.isLoadingResults = false;
      });
  }

  deleteCampaign(id) {
    this.isLoadingResults = true;
    this.api.deleteCampaign(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/campaigns']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }
}
