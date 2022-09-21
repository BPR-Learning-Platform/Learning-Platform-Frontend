import { Component, OnInit } from '@angular/core';
import {LpRestService} from "../../services/lp-rest.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LPTask} from "../../models/lptask.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  taskIndex: number = 0;
  alertToShow?: Alert = undefined;
  number = '';

  constructor(private lpRestService: LpRestService,
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getTasks();

  }

  async getNextTask(event: any): Promise<void> {
    if (Number(event.target.value) === this.tasks[this.taskIndex].answer) {
      this.alertToShow = ALERTS[0];
    } else {
      this.alertToShow = ALERTS[1];
    }

    await new Promise(f => setTimeout(f, 3000));
    this.taskIndex++;
    this.number = '';
    this.alertToShow = undefined;
  }

  getTasks(): void{
    this.lpRestService.getTasks(this.authService.getCurrentUserId()!).subscribe(res => {
      this.tasks = res;
    });
  }
}
