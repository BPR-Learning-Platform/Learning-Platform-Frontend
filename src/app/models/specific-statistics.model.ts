export interface SpecificStudentStatistic {
  statisticId: string;
  studentId: string;
  score: number;
  timeStamp: string;
}

export interface SpecificGradeStatistic {
  statisticId: string;
  score: number;
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
}

export interface StatisticInfo {
  name: string;
  average: string;
  highest: string;
  lowest: string;
  trend: string;
}
