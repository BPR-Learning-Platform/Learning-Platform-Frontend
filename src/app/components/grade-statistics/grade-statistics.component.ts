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
  lineChartOptions = JSON.parse(JSON.stringify(lineChartOptions)) as typeof lineChartOptions;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private lpRestService: LpRestService) {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    if (!this.authenticationService.isUserRole("T"))
      this.router.navigateByUrl("/").then(() => window.location.reload());
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
    if(this.gradeSelected){
      this.lpRestService.getSpecificGradeStatistic(value).subscribe(
        (data) => {
          let grade: AssignedGrades = this.assignedGrades.find(grade => grade.gradeId === value)!;
          let label = grade.gradeName;
          this.updateLine(data.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label + " Average", 0);
          this.updateLine(data.map(statistic => statistic.score.a), label + " Addition", 1);
          this.updateLine(data.map(statistic => statistic.score.s), label + " Subtraction", 2);
          this.updateLine(data.map(statistic => statistic.score.m), label + " Multiplication", 3);
          this.updateLine(data.map(statistic => statistic.score.d), label + " Division", 4);
          this.updateLabel(data.map(statistic => getWeekNumber(statistic.timeStamp)));


          this.lpRestService.getAllGradesStatistics(value, grade.step).subscribe(
            (stat) => {
              let label = "step " + grade.step;
              this.updateLine(stat.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label + " Average", 5);
              this.updateLine(stat.map(statistic => statistic.score.a), label + " Addition", 6);
              this.updateLine(stat.map(statistic => statistic.score.s), label + " Subtraction", 7);
              this.updateLine(stat.map(statistic => statistic.score.m), label + " Multiplication", 8);
              this.updateLine(stat.map(statistic => statistic.score.d), label + " Division", 9);
            }
          );

        }
      );
    }
    for (let i = 0; i < 5; i++) {
      this.updateLine([],"", i);
    }
  }

  updateLabel(labels: any[]): void{
    this.lineChartData.labels = labels;
    if (this.chart !== undefined)
      this.chart.update();
  }
  updateLine(data: any[], label: string, type: number): void {
    this.lineChartData.datasets[type].data = data;
    this.lineChartData.datasets[type].label = label;
    if (this.chart !== undefined)
      this.chart.update();
  }

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

}
