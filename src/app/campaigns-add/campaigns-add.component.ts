import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaigns-add',
  templateUrl: './campaigns-add.component.html',
  styleUrls: ['./campaigns-add.component.css']
})
export class CampaignsAddComponent implements OnInit {
  options: string[] = ['Keyword 1', 'Keyword 2', 'Keyword 3'];
  towns: string[] = ['Town 1', 'Town 2', 'Town 3'];

  campaignForm: FormGroup;
  name = '';
  keywords = '';
  bidAmount: number = null;
  fund: number = null;
  status = '';
  town = '';
  radius: number = null;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.campaignForm = this.formBuilder.group({
      name : [null, Validators.required],
      keywords : [null, Validators.required],
      bidAmount : [null, Validators.min(100)],
      fund : [null, Validators.required],
      status : [null, Validators.required],
      town : [null],
      radius : [null, Validators.required]
    });
  }
  onFormSubmit(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCampaign(form)
      .subscribe(res => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/campaigns-detail', id]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }
}
