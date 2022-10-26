import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "../../app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {LpRestService} from "../../services/lp-rest.service";

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {

    localStorage.setItem("type", "S");
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule],
      providers: [AuthenticationService, LpRestService],
      declarations: [ TaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    localStorage.removeItem("type");
  });
});
