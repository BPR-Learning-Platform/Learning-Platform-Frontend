import { Component, OnInit } from '@angular/core';
import {LpRestService} from "../../services/lp-rest.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LPTask} from "../../models/lptask.model";
import {Router} from "@angular/router";

interface Alert {
  type: string;
  message: string;
}
const ALERTS: Alert[] = [{
  type: 'success',
  message: 'You did it! Awesome! Keep going!',
}, {
  type: 'warning',
  message: 'That wasn\'t the correct answer, next time you will get it!',
}];

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: Array<LPTask> = [];
  alertToShow?: Alert = undefined;
  taskIndex: number = 0; correctAnswers: number = 0; answer = ''; showHint: boolean = false;

  constructor(private lpRestService: LpRestService,
              private router: Router,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (!this.authService.isUserRole("S"))
      this.router.navigateByUrl("/main-statistics").then(() => window.location.reload());
    this.getTasks();
  }

  async getNextTask(event: any): Promise<void> {
    if (Number(event.target.value) === this.tasks[this.taskIndex].answer) {
      this.alertToShow = ALERTS[0];
      this.correctAnswers++;
    } else
        this.alertToShow = ALERTS[1];

    await new Promise(f => setTimeout(f, 3000));
    if (this.taskIndex < this.tasks.length - 1)
      this.taskIndex++;
    else
      this.getTasks();
  }

  getTasks(): void {
    const taskIds = [];
    let correctPercentage: number = Math.floor(this.correctAnswers / this.tasks.length * 100);
    if (isNaN(correctPercentage))
      correctPercentage = 0;
    for (let task of this.tasks)
      taskIds.push(task.taskId);

    this.lpRestService.getTasks(this.authService.getCurrentUserId()!, correctPercentage, taskIds).subscribe(res => {
      this.tasks = res;
    });
    this.reset();
  }

  reset(): void{
    this.answer = '';
    this.alertToShow = undefined;
    this.correctAnswers = 0;
    this.taskIndex = 0;
  }
}
