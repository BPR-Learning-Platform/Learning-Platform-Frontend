import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {LpRestService} from "../../services/lp-rest.service";
import {Chart, ChartType} from "chart.js";
import {default as Annotation} from "chartjs-plugin-annotation";
import {AssignedGrades} from "../../models/specific-statistics.model";
import {lineChartData, lineChartOptions, getWeekNumber} from "../../models/chart.model";
import {BaseChartDirective} from "ng2-charts";

@Component({
  selector: 'app-grade-statistics',
  templateUrl: './grade-statistics.component.html',
  styleUrls: ['./grade-statistics.component.css']
})
export class GradeStatisticsComponent implements OnInit {

  gradeSelected: boolean = false;
  assignedGrades!: AssignedGrades[];
  lineChartData = JSON.parse(JSON.stringify(lineChartData)) as typeof lineChartData;
  lineChartOptions = lineChartOptions;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private lpRestService: LpRestService) {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    if (this.authenticationService.isUserRole("S"))
      this.router.navigateByUrl("/").then(() => window.location.reload());
    if (this.authenticationService.isUserRole("A"))
      this.router.navigateByUrl("/create-user").then(() => window.location.reload());
    this.getAllGrades();
  }

  getAllGrades() {
    this.lpRestService.getMyAssignedStudents(this.authenticationService.getCurrentUserId()).subscribe(
      (data) => {
        this.assignedGrades = data;
      });
  }

  onGradeSelected(value: string) {
    this.gradeSelected = value !== "default";
    if (this.gradeSelected) {
      this.lpRestService.getSpecificGradeStatistic(value).subscribe(
        (data) => {
          let grade: AssignedGrades = this.assignedGrades.find(grade => grade.gradeId === value)!;
          this.updateLines(data, grade.gradeName, 0);
          this.updateLabel(data.map(statistic => getWeekNumber(statistic.timeStamp)));

          this.lpRestService.getAllGradesStatistics(value, grade.step).subscribe(
            (stat) => {
              this.updateLines(stat, "Step " + grade.step, 5);
            }
          );
        });
    }
    for (let i = 0; i < 10; i++) {
      this.updateLine([],"", i);
    }
  }

  updateLabel(labels: any[]): void{
    this.lineChartData.labels = labels;
    if (this.chart === undefined) return;
    this.chart.update();
  }

  updateLines(data: any[], label: string, offset: number){
    this.updateLine(data.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label + " Average", offset);
    this.updateLine(data.map(statistic => statistic.score.a), label + " Addition", offset + 1);
    this.updateLine(data.map(statistic => statistic.score.s), label + " Subtraction", offset + 2);
    this.updateLine(data.map(statistic => statistic.score.m), label + " Multiplication", offset + 3);
    this.updateLine(data.map(statistic => statistic.score.d), label + " Division", offset + 4);
  }

  updateLine(data: any[], label: string, type: number): void {
    this.lineChartData.datasets[type].data = data;
    this.lineChartData.datasets[type].label = label;
    if (this.chart === undefined) return;
    this.chart.update();
  }

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
