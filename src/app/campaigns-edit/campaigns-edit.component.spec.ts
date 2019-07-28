import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsEditComponent } from './campaigns-edit.component';

describe('CampaignsEditComponent', () => {
  let component: CampaignsEditComponent;
  let fixture: ComponentFixture<CampaignsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
