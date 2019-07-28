import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaigns-edit',
  templateUrl: './campaigns-edit.component.html',
  styleUrls: ['./campaigns-edit.component.css']
})
export class CampaignsEditComponent implements OnInit {
  options: string[] = ['Keyword 1', 'Keyword 2', 'Keyword 3'];
  towns: string[] = ['Town 1', 'Town 2', 'Town 3'];
  campaignForm: FormGroup;
  name = '';
  keywords = '';
  bidAmount: number = null;
  fund: number = null;
  status = '';
  town = '';
  _id: number = null;
  radius: number = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getCampaign(this.route.snapshot.params.id);
    this.campaignForm = this.formBuilder.group({
      name : [null, Validators.required],
      keywords : [null, Validators.required],
      bidAmount : [null, Validators.required],
      fund : [null, Validators.required],
      status : [null, Validators.required],
      town : [null],
      radius : [null, Validators.required]
    });
  }

    getCampaign(id) {
      this.api.getCampaign(id).subscribe(data => {
        this._id  = data.id;
        this.campaignForm.setValue({
          name: data.name,
          keywords: data.keywords,
          bidAmount: data.bidAmount,
          fund: data.fund,
          status: data.status,
          town: data.town,
          radius: data.radius
        });
      });
      console.log(id);
      console.log(this._id);
    }

    onFormSubmit(form:NgForm) {
      this.isLoadingResults = true;
      this.api.updateCampaign(this._id, form)
        .subscribe(res => {
            this.isLoadingResults = false;
            this.router.navigate(['/campaigns']);
          }, (err) => {
            console.log(err);
            this.isLoadingResults = false;
          }
        );
    }
    campaignList() {
      this.router.navigate(['/campaigns']);
    }

}
