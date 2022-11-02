import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {NEVER, Observable} from "rxjs";
import {LPTask} from "../models/lptask.model";
import {AssignedGrades, SpecificGradeStatistic, SpecificStudentStatistic} from "../models/specific-statistics.model";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class LpRestService {

  constructor(private http: HttpClient) { }

  getTasks(userId: string, numberCorrect: number, taskIds: number[]): Observable<LPTask[]> {
    if (userId != null) {
      let apiUrl = `${baseUrl}tasks?userid=${userId}&correct=${numberCorrect}&taskids=${taskIds}`;
      return this.http.get<any>(apiUrl);
    }
    return NEVER;
  }

  getSpecificStudentStatistic(studentId: string): Observable<SpecificStudentStatistic[]> {
    if (studentId != null) {
      let apiUrl = `${baseUrl}statistics?studentid=${studentId}`;
      return this.http.get<any>(apiUrl);
    }
    return NEVER;
  }

  getSpecificGradeStatistic(gradeId: string): Observable<SpecificGradeStatistic[]> {
    if (gradeId != null) {
      let apiUrl = `${baseUrl}statistics?gradeid=${gradeId}`;
      return this.http.get<any>(apiUrl);
    }
    return NEVER;
  }

  getMyAssignedStudents(teacherId: string | null): Observable<AssignedGrades[]> {
    if (teacherId != null) {
      let apiUrl = `${baseUrl}grades?teacherid=${teacherId}`;
      return this.http.get<any>(apiUrl);
    }
    return NEVER;
  }
}
