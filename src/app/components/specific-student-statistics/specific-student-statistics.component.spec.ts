import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificStudentStatisticsComponent } from './specific-student-statistics.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";
import {AuthenticationService} from "../../services/authentication.service";
import {LpRestService} from "../../services/lp-rest.service";
import {BaseChartDirective} from "ng2-charts";

describe('SpecificStudentStatisticsComponent', () => {
  let component: SpecificStudentStatisticsComponent;
  let fixture: ComponentFixture<SpecificStudentStatisticsComponent>;

  beforeEach(async () => {
    localStorage.setItem("type", "T");
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule ],
      providers: [LpRestService, AuthenticationService, BaseChartDirective],
      declarations: [ SpecificStudentStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificStudentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.removeItem("type");
  });
});
