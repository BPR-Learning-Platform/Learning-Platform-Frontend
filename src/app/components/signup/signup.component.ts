import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {AllGrades} from "../../models/user.model";
import {LpRestService} from "../../services/lp-rest.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  private emailPattern = "[a-z_A-Z0-9._%+-]+@[a-z_A-Z0-9.-]+\.[a-z_A-Z]{2,4}$";
  grades: AllGrades[] = [];
  selection: any;
  status: any | null = null;
  assignedGrades = new FormControl('', [Validators.required]);


  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    type: new FormControl('', [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private lpRestService: LpRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authenticationService.isUserRole("S"))
      this.router.navigateByUrl("/").then(() => window.location.reload());
    if (this.authenticationService.isUserRole("T"))
      this.router.navigateByUrl("/main-statistics").then(() => window.location.reload());
    this.getGrades();
  }

  typeSelection() {
    this.assignedGrades = new FormControl('', [Validators.required]);
  }

  get nameControl(): FormControl {
    return this.signupForm.get('name') as FormControl;
  }

  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  get typeControl(): FormControl {
    return this.signupForm.get('type') as FormControl;
  }

  get f() { return this.signupForm.controls; }

  getGrades(): void {
    this.lpRestService.getAllGrades().subscribe(res => {
      this.grades = res;
    });
  }

  signup(): void {
    let name = this.f['name'].value
    let email = this.f['email'].value
    let password = this.f['password'].value
    let type = this.f['type'].value
    if (name != null && email != null && password != null && type != null) {
      let grades: any;
      if (type === 'S')
        grades = [this.assignedGrades.value];
      else
        grades = this.assignedGrades.value;
      let user = {
        name: name,
        email: email.toLowerCase(),
        password: password,
        type: type,
        assignedGradeIds: grades,
      }

      this.authenticationService.signup(user).subscribe({
        next: r => {
          if (r.status === 201) {
            this.status = {text: "User created successfully", type: "success"};
            this.signupForm.reset();
            this.assignedGrades.reset();
            this.resetStatus().then(r => {})
          }
        },
        error: err => {
          if (err.status === 403)
            this.status = {text: "An user with that email already exists", type: "danger"};
          else
            this.status = {text: "Server error, try again later", type: "danger"};
        }
      });
    }
  }

  async resetStatus() {
    await new Promise(f => setTimeout(f, 4000));
    this.status = null;
  }

}
