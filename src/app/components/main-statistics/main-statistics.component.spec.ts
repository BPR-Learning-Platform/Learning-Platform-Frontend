import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStatisticsComponent } from './main-statistics.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";
import {AuthenticationService} from "../../services/authentication.service";
import {SpecificStatisticsComponent} from "../specific-statistics/specific-statistics.component";
import {Chart} from "chart.js";
import {BaseChartDirective} from "ng2-charts";

describe('MainStatisticsComponent', () => {
  let component: MainStatisticsComponent;
  let fixture: ComponentFixture<MainStatisticsComponent>;

  beforeEach(async () => {

    localStorage.setItem("user",
      JSON.stringify({
        name: "batman is my name",
        email: "em",
        type: "T",
        assignedGradesIds: [2, 3],
        score: 0,
        userId: "221"
      }));

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      providers: [AuthenticationService],
      declarations: [ MainStatisticsComponent, SpecificStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.removeItem("user");
  });
});
