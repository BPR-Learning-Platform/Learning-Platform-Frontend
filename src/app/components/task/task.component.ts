import { Component, OnInit } from '@angular/core';
import {LpRestService} from "../../services/lp-rest.service";
import {AuthenticationService} from "../../services/authentication.service";
import {LPTask, LPTaskScore} from "../../models/lptask.model";
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
  taskIndex: number = 0; answer = ''; showHint: boolean = false;
  correct: number[] = [];

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
      this.correct.push(this.tasks[this.taskIndex].taskId);
    } else
        this.alertToShow = ALERTS[1];

    await new Promise(f => setTimeout(f, 3000));
    if (this.taskIndex < this.tasks.length - 1)
      this.taskIndex++;
    else
      this.getTasks();
    this.answer = '';
    this.alertToShow = undefined;
  }

  getTasks(): void {
    const taskIds = [];
    for (let task of this.tasks)
      taskIds.push(task.taskId);
    this.lpRestService.getTasks(this.authService.getCurrentUserId()!, this.getScore(), taskIds).subscribe(res => {
      this.tasks = res;
    });
    this.reset();
  }

  reset(): void{
    this.correct = [];
    this.taskIndex = 0;
  }

  getScore(): LPTaskScore {
    let score: LPTaskScore;
    let mCount = 0, aCount = 0, sCount = 0, dCount = 0, mCorrect = 0, aCorrect = 0, sCorrect = 0, dCorrect = 0;
    this.tasks.forEach(task => {
      switch (task.type) {
        case "M": {
          mCount++;
          if (this.correct.includes(task.taskId))
            mCorrect++;
          break;
        }
        case "A": {
          aCount++;
          if (this.correct.includes(task.taskId))
            aCorrect++;
          break;
        }
        case "S": {
          sCount++;
          if (this.correct.includes(task.taskId))
            sCorrect++;
          break;
        }
        case "D": {
          dCount++;
          if (this.correct.includes(task.taskId))
            dCorrect++;
          break;
        }
        default: break;
      }
    });

    score = {
      A: {
        count: aCount,
        percentage: Math.floor(aCorrect / aCount * 100)
      },
      M: {
        count: mCount,
        percentage: Math.floor(mCorrect / mCount * 100)
      },
      S: {
        count: sCount,
        percentage: Math.floor(sCorrect / sCount * 100)
      },
      D: {
        count: dCount,
        percentage: Math.floor(dCorrect / dCount * 100)
      }
    }
    return score;
  }
}
