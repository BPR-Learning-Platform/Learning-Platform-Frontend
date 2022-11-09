import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {AllGrades} from "../../models/user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  private emailPattern = "[a-z_A-Z0-9._%+-]+@[a-z_A-Z0-9.-]+\.[a-z_A-Z]{2,4}$";
  grades: AllGrades[] = [{name: "test", id: 2}, {name: "test2", id: 23}]
  selection: any;
  status: any | null = null;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    type: new FormControl('', [Validators.required]),
    assignedGrades: new FormControl('', [Validators.required])
  });

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  get assignedGradesControl(): FormControl {
    return this.signupForm.get('assignedGrades') as FormControl;
  }

  get f() { return this.signupForm.controls; }

  signup(): void {
    let name = this.f['name'].value
    let email = this.f['email'].value
    let password = this.f['password'].value
    let type = this.f['type'].value
    let assignedGrades = this.f['assignedGrades'].value
    let grades = [Number(assignedGrades)];

    if (name != null && email != null && password != null && type != null) {
      let user = {
        name: name,
        email: email.toLowerCase(),
        password: password,
        type: type,
        assignedGradeIds: grades,
      }

      this.authenticationService.signup(user).subscribe(r => {
          if (r.status === 201)
            this.status = {text: "User created successfully", type: "success"};
          else
            this.status = {text: "Error", type: "danger"};
        });
    }
  }
}
