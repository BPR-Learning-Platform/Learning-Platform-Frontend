import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import {LpRestService} from "../../services/lp-rest.service";
import {AssignedGrades, Student} from "../../models/specific-student-statistic";

@Component({
  selector: 'app-specific-student-statistics',
  templateUrl: './specific-student-statistics.component.html',
  styleUrls: ['./specific-student-statistics.component.css']
})
export class SpecificStudentStatisticsComponent implements OnInit {

  gradeSelected: boolean = false;
  assignedGrades: AssignedGrades[] = [];

  students: Student[] = [];

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private lpRestService: LpRestService) {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    if (!this.authenticationService.isUserTeacher())
      this.router.navigateByUrl("/").then(() => window.location.reload());
    this.getMyAssignedStudents();
  }

  onStudentChosen(student: string): void {
    if(student !== "default")
      this.getSpecificStudentStatistic(student);
  }

  onGradeSelected(value: string) {
    this.gradeSelected = value !== "default";
    if(this.gradeSelected){
      // @ts-ignore
      this.students = this.assignedGrades.find(grade => grade.gradeId === value).students;
    }
    this.updateChart([], [], "");
  }

  getSpecificStudentStatistic(studentId: string): void {
    this.lpRestService.getSpecificStudentStatistic(studentId).subscribe(
      (data) => {
        let chartData: number[] = [];
        let chartLabels: string[] = [];
        data.forEach((statistic) => {
          chartData.push(statistic.score);
          chartLabels.push(this.getWeekNumber(statistic.timeStamp));
        });
        // @ts-ignore
        let label = this.students.find((student: { userId: string; }) => student.userId === studentId).name;
        this.updateChart(chartData, chartLabels, label);
      });
  }

  getMyAssignedStudents() {
    this.lpRestService.getMyAssignedStudents(this.authenticationService.getCurrentUserId()).subscribe(
      (data) => {
        this.assignedGrades = data;
      });
  }

  updateChart(data: any[], labels: any[], label: string): void {
    this.lineChartData.datasets[0].data = data;
    this.lineChartData.datasets[0].label = label;
    this.lineChartData.labels = labels;
    if (this.chart !== undefined)
      this.chart.update();
  }
  getWeekNumber(timeStamp: string): string{
    let currentDate = new Date(timeStamp);
    let startDate = new Date(currentDate.getFullYear(), 0, 1);
    let days: number = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    return "Week " + Math.ceil(days / 7);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [] = [],
        label: '',
        backgroundColor: 'transparent',
        fill: 'origin',
      }
    ],
    labels: [] = [],

  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.2,
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week'
        }
      },
      'y-axis-0':
        {
          position: 'left',
          title: {
            display: true,
            text: 'Score'
          }
        },
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


}
