import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {EMPTY, Observable} from "rxjs";
import {LPTask, LPTaskScore} from "../models/lptask.model";
import {AssignedGrades, SpecificGradeStatistic, SpecificStudentStatistic} from "../models/specific-statistics.model";
import {AllGrades} from "../models/user.model";

const baseUrl = environment.learningPlatformApiUrl;
@Injectable({
  providedIn: 'root'
})
export class LpRestService {

  constructor(private http: HttpClient) { }

  getTasks(userId: string, score: LPTaskScore, taskIds: number[]): Observable<LPTask[]> {
    if (userId !== null) {
      let apiUrl = `${baseUrl}tasks?userid=${userId}&correct=${JSON.stringify(score)}&taskids=${taskIds}`;
      return this.http.get<any>(apiUrl);
    }
    return EMPTY;
  }

  getSpecificStudentStatistic(studentId: string): Observable<SpecificStudentStatistic[]> {
    if (studentId !== null) {
      let apiUrl = `${baseUrl}statistics?studentid=${studentId}`;
      return this.http.get<any>(apiUrl);
    }
    return EMPTY;
  }

  getSpecificGradeStatistic(gradeId: string): Observable<SpecificGradeStatistic[]> {
    if (gradeId !== null) {
      let apiUrl = `${baseUrl}statistics?gradeid=${gradeId}`;
      return this.http.get<any>(apiUrl);
    }
    return EMPTY;
  }

  getMyAssignedStudents(teacherId: string | null): Observable<AssignedGrades[]> {
    if (teacherId !== null) {
      let apiUrl = `${baseUrl}grades?teacherid=${teacherId}`;
      return this.http.get<any>(apiUrl);
    }
    return EMPTY;
  }

  getAllGrades(): Observable<AllGrades[]> {
      let apiUrl = `${baseUrl}grades`;
      return this.http.get<any>(apiUrl);
  }

  getAllGradesStatistics(gradeId: string, step: string): Observable<SpecificGradeStatistic[]> {
    if (gradeId !== null) {
      let apiUrl = `${baseUrl}statistics?gradeid=${gradeId}&step=${step}`;
      return this.http.get<any>(apiUrl);
    }
    return EMPTY;
  }
}
