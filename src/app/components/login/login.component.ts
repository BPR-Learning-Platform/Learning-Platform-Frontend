import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private emailPattern = "[a-z_A-Z0-9._%+-]+@[a-z_A-Z0-9.-]+\.[a-z_A-Z]{2,4}$";
  errorText: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn())
      this.router.navigateByUrl("/").then(() => window.location.reload());
  }

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  get f() { return this.loginForm.controls; }

  login(): void {
    let email = this.f['email'].value
    let password = this.f['password'].value
    // @ts-ignore
    this.authenticationService.login(email.toLowerCase(), password).subscribe({
      next: () => {
        this.router.navigateByUrl("/").then(() => window.location.reload());
      },
      error: () => {
        this.errorText = "Couldn't log you in with those credentials, please try again."
      }
    });
  }
}
