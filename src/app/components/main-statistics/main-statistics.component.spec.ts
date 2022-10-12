import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStatisticsComponent } from './main-statistics.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";

describe('MainStatisticsComponent', () => {
  let component: MainStatisticsComponent;
  let fixture: ComponentFixture<MainStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      declarations: [ MainStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
