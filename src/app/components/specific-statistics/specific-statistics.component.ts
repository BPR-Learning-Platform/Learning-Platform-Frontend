import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { Chart, ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {default as Annotation} from 'chartjs-plugin-annotation';
import {LpRestService} from "../../services/lp-rest.service";
import {AssignedGrades, Student} from "../../models/specific-statistics.model";

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
      trend: "not available"
    }
    this.infoChange.emit(this.info);
  }

  onStudentChosen(student: string): void {
    if(student !== "default")
      this.getSpecificStudentStatistic(student);
    else {
      this.onGradeSelected(this.gradeOption)
      this.updateStudentLine([],  "", 1);
      this.updateStudentLine([],  "", 2);
      this.updateStudentLine([],  "", 3);
      this.updateStudentLine([],  "", 4);
    }
  }

  onGradeSelected(value: string) {
    this.gradeSelected = value !== "default";
    if(this.gradeSelected){
      this.students = this.assignedGrades.find(grade => grade.gradeId === value)!.students;

      this.lpRestService.getSpecificGradeStatistic(value).subscribe(
        (data) => {
          console.log(data);
          let chartData: number[] = [];
          let chartLabels: string[] = [];
          data.forEach((statistic) => {
            chartData.push(statistic.score.a);
            chartLabels.push(this.getWeekNumber(statistic.timeStamp));
          });
          let label = this.assignedGrades.find(grade => grade.gradeId === value)!.gradeName
          this.updateGradeLine(chartData, chartLabels, label);
          this.changeInfo(chartData, label);
        }
      );
    }
    this.updateGradeLine([],[],"");
  }

  getSpecificStudentStatistic(studentId: string): void {
    this.lpRestService.getSpecificStudentStatistic(studentId).subscribe(
      (data) => {
        console.log(data);
        let chartDataAddition: number[] = [];
        let chartDataMultiplication: number[] = [];
        let chartDataSubtraction: number[] = [];
        let chartDataDivision: number[] = [];
        data.forEach((statistic) => {
          chartDataAddition.push(statistic.score.a);
          chartDataMultiplication.push(statistic.score.m);
          chartDataSubtraction.push(statistic.score.s);
          chartDataDivision.push(statistic.score.d);
        });
        let label = this.students.find((student: { userId: string; }) => student.userId === studentId)!.name;
        this.updateStudentLine(chartDataAddition, label + " Addition", 1);
        this.updateStudentLine(chartDataSubtraction, label + " Subtraction", 2);
        this.updateStudentLine(chartDataMultiplication, label + " Multiplication", 3);
        this.updateStudentLine(chartDataDivision, label + " Division", 4);
        this.changeInfo(chartDataAddition, label);
      });
  }

  getMyAssignedStudents() {
    this.lpRestService.getMyAssignedStudents(this.authenticationService.getCurrentUserId()).subscribe(
      (data) => {
        this.assignedGrades = data;
      });
  }

  updateGradeLine(data: any[], labels: any[], label: string): void {
    this.lineChartData.datasets[0].data = data;
    this.lineChartData.datasets[0].label = label;
    this.lineChartData.labels = labels;
    if (this.chart !== undefined)
      this.chart.update();
  }

  updateStudentLine(data: any[], label: string, type: number): void {
    this.lineChartData.datasets[type].data = data;
    this.lineChartData.datasets[type].label = label;
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
      },
      {
        data: [] = [],
        label: '',
        backgroundColor: 'transparent',
        fill: 'origin',
      },
      {
        data: [] = [],
        label: '',
        backgroundColor: 'transparent',
        fill: 'origin',
      },
      {
        data: [] = [],
        label: '',
        backgroundColor: 'transparent',
        fill: 'origin',
      },
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
          suggestedMax: 10,
          suggestedMin: 0,
          beginAtZero: true,
          display: true,
          position: 'left',
          title: {
            display: true,
            text: 'Score'
          }
        },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


}
