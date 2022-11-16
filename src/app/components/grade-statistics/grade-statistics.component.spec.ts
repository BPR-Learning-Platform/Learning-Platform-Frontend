import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeStatisticsComponent } from './grade-statistics.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";
import {LpRestService} from "../../services/lp-rest.service";
import {AuthenticationService} from "../../services/authentication.service";
import {BaseChartDirective} from "ng2-charts";

describe('GradeStatisticsComponent', () => {
  let component: GradeStatisticsComponent;
  let fixture: ComponentFixture<GradeStatisticsComponent>;

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
      imports: [HttpClientModule, AppRoutingModule ],
      providers: [LpRestService, AuthenticationService, BaseChartDirective],
      declarations: [ GradeStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.removeItem("user");
  });
});
