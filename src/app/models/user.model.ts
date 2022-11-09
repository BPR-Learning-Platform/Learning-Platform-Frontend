export interface User {
  name: string;
  email: string;
  type: string;
  assignedGradesIds: number[];
  score: number
  userId: string;
}

export interface AllGrades{
  name: string;
  id: number;
}
