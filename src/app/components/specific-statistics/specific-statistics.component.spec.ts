import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificStatisticsComponent } from './specific-statistics.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";
import {AuthenticationService} from "../../services/authentication.service";
import {LpRestService} from "../../services/lp-rest.service";
import {BaseChartDirective} from "ng2-charts";

describe('SpecificStatisticsComponent', () => {
  let component: SpecificStatisticsComponent;
  let fixture: ComponentFixture<SpecificStatisticsComponent>;

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
      declarations: [ SpecificStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.removeItem("user");
  });
});
