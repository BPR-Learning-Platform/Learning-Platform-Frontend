import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import {AuthenticationService} from "../../services/authentication.service";
import {HttpClientModule} from "@angular/common/http";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

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
      imports: [HttpClientModule],
      declarations: [SignupComponent ],
      providers: [AuthenticationService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    localStorage.removeItem("user");
  });
});
