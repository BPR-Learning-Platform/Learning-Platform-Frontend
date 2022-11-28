import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {StatisticInfo} from "../../models/specific-statistics.model";

@Component({
  selector: 'app-main-statistics',
  templateUrl: './main-statistics.component.html',
  styleUrls: ['./main-statistics.component.css']
})
export class MainStatisticsComponent implements OnInit {
  info: StatisticInfo = {
    name: "",
    average: "not available",
    highest: "not available",
    lowest: "not available",
    trend: "not available"
  };

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserRole("S"))
      this.router.navigateByUrl("/").then(() => window.location.reload());
  }

}
