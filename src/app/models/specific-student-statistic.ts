export interface SpecificStudentStatistic {
  statisticId: string;
  studentId: string;
  gradeId: string;
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
