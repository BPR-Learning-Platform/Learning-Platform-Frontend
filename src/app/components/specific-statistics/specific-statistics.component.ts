import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {Chart, ChartType} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import {LpRestService} from "../../services/lp-rest.service";
import {AssignedGrades, Student} from "../../models/specific-statistics.model";
import {lineChartData, lineChartOptions, getWeekNumber} from "../../models/chart.model";

@Component({
  selector: 'app-specific-statistics',
  templateUrl: './specific-statistics.component.html',
  styleUrls: ['./specific-statistics.component.css']
})
export class SpecificStatisticsComponent implements OnInit {

  gradeOption!: string;
  gradeSelected: boolean = false;
  assignedGrades!: AssignedGrades[];
  students: Student[] = [];

  lineChartData = JSON.parse(JSON.stringify(lineChartData)) as typeof lineChartData;
  lineChartOptions =  lineChartOptions;

  @Input() info: any;
  @Output() infoChange = new EventEmitter<any>();

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private lpRestService: LpRestService) {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    if (!this.authenticationService.isUserRole("T"))
      this.router.navigateByUrl("/").then(() => window.location.reload());
    this.getMyAssignedStudents();
  }

  changeInfo(data: number[], name: string): void {
    if (data.length === 0){
      this.info = {
        name: "",
        average: "not available",
        highest: "not available",
        lowest: "not available",
        trend: "not available"
      }
      this.infoChange.emit(this.info);
      return;
    }
    this.info = {
      name: name,
      average: (data.reduce((a, b) => a + b, 0) / data.length).toFixed(2),
      highest: Math.max.apply(Math, data).toFixed(2),
      lowest: Math.min.apply(Math, data).toFixed(2),
      trend: (((data[data.length - 1] - data[data.length - 2]) / data[data.length - 2]) * 100).toFixed(2) + "%"
    }
    this.infoChange.emit(this.info);
  }

  onStudentChosen(student: string): void {
    if(student !== "default")
      this.getSpecificStudentStatistic(student);
    else {
      this.onGradeSelected(this.gradeOption)
      for (let i = 0; i < 5; i++) {
        this.updateLine([], "", 5 + i);
      }
    }
  }

  onGradeSelected(value: string) {
    this.gradeSelected = value !== "default";
    if(this.gradeSelected){
      this.students = this.assignedGrades.find(grade => grade.gradeId === value)!.students;

      this.lpRestService.getSpecificGradeStatistic(value).subscribe(
        (data) => {
          let label = this.assignedGrades.find(grade => grade.gradeId === value)!.gradeName
          this.updateLine(data.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label + " Average", 0);
          this.updateLine(data.map(statistic => statistic.score.a), label + " Addition", 1);
          this.updateLine(data.map(statistic => statistic.score.s), label + " Subtraction", 2);
          this.updateLine(data.map(statistic => statistic.score.m), label + " Multiplication", 3);
          this.updateLine(data.map(statistic => statistic.score.d), label + " Division", 4);
          this.updateLabel(data.map(statistic => getWeekNumber(statistic.timeStamp)));
          this.changeInfo(data.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label);
        }
      );
    }
    for (let i = 0; i < 5; i++) {
      this.updateLine([],"", i);
    }
  }

  getSpecificStudentStatistic(studentId: string): void {
    this.lpRestService.getSpecificStudentStatistic(studentId).subscribe(
      (data) => {
        let label = this.students.find((student: { userId: string; }) => student.userId === studentId)!.name;
        this.updateLine(data.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label + " Average", 5);
        this.updateLine(data.map(statistic => statistic.score.a), label + " Addition", 6);
        this.updateLine(data.map(statistic => statistic.score.s), label + " Subtraction", 7);
        this.updateLine(data.map(statistic => statistic.score.m), label + " Multiplication", 8);
        this.updateLine(data.map(statistic => statistic.score.d), label + " Division", 9);
        this.changeInfo(data.map(statistic => (statistic.score.a + statistic.score.m + statistic.score.s + statistic.score.d) / 4), label);
      });
  }

  getMyAssignedStudents() {
    this.lpRestService.getMyAssignedStudents(this.authenticationService.getCurrentUserId()).subscribe(
      (data) => {
        this.assignedGrades = data;
      });
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
