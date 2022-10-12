import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificStudentStatisticsComponent } from './specific-student-statistics.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";

describe('SpecificStudentStatisticsComponent', () => {
  let component: SpecificStudentStatisticsComponent;
  let fixture: ComponentFixture<SpecificStudentStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [ SpecificStudentStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificStudentStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
