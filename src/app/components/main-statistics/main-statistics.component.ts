import {Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-main-statistics',
  templateUrl: './main-statistics.component.html',
  styleUrls: ['./main-statistics.component.css']
})
export class MainStatisticsComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (!this.authenticationService.isUserTeacher())
      this.router.navigateByUrl("/").then(() => window.location.reload());
  }

}
