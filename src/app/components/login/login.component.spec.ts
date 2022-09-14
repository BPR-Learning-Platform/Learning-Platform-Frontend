import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthenticationService} from "../../services/authentication.service";
import {AppRoutingModule} from "../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
      providers: [AuthenticationService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Element count should be 2', () => {
    const formElement = fixture.debugElement.nativeElement.querySelector('form')
    const inputElements = formElement.querySelectorAll('input');

    expect(inputElements.length).toBe(2);
  });

  it('inital form values should be empty', () => {
    const loginFormGroup = component.loginForm;
    const loginFormValues = {
      email: '',
      password: ''
    }

    expect(loginFormGroup.value).toEqual(loginFormValues);
  });

  it('No validation error entering valid value for email', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('form').querySelectorAll('input')[0];
    loginFormUserElement.value = 'test@email.dk';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameValueFormGroup = component.loginForm.get('email');
      // @ts-ignore
      expect(loginFormUserElement.value).toEqual(userNameValueFormGroup.value);
      expect(userNameValueFormGroup?.errors).toBeNull();
    })
  });

  it('Validation error entering invalid value for email', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('form').querySelectorAll('input')[0];
    loginFormUserElement.value = 'test';
    loginFormUserElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userNameValueFormGroup = component.loginForm.get('email');
      // @ts-ignore
      expect(loginFormUserElement.value).toEqual(userNameValueFormGroup.value);
      expect(userNameValueFormGroup?.errors).
      toEqual({ pattern: Object({ requiredPattern: '^[a-z_A-Z0-9._%+-]+@[a-z_A-Z0-9.-]+.[a-z_A-Z]{2,4}$', actualValue: 'test' }) });
    })
  });

  it('Login form is valid when email and password validations are fulfilled', () => {
    const loginFormUserElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('form').querySelectorAll('input')[0];
    const loginFormPasswordElement: HTMLInputElement = fixture.debugElement.nativeElement
      .querySelector('form').querySelectorAll('input')[0];

    loginFormUserElement.value = 'test@email.dk';
    loginFormPasswordElement.value = 'test1234';

    loginFormUserElement.dispatchEvent(new Event('input'));
    loginFormUserElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.loginForm.errors).toBeNull();
    })
  });

});
