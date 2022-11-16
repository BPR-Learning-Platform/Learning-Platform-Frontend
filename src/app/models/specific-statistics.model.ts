import {LPTaskScore} from "./lptask.model";

export interface SpecificStudentStatistic {
  statisticId: string;
  studentId: string;
  score: { a: number, d: number, m: number, s: number };
  timeStamp: string;
}

export interface SpecificGradeStatistic {
  statisticId: string;
  score: { a: number, d: number, m: number, s: number };
  timeStamp: string;
}

export interface Student {
  userId: string;
  name: string;
}

export interface AssignedGrades {
  gradeId: string;
  gradeName: string;
  students: Student[];
  step: string;
}

export interface StatisticInfo {
  name: string;
  average: string;
  highest: string;
  lowest: string;
  trend: string;
}
