export interface User {
  name: string;
  email: string;
  type: string;
  assignedGradesIds: number[];
  score: number
  userId: string;
}

export interface NewUser {
  name: string;
  email: string;
  password: string;
  type: string;
  assignedGradeIds: number[];
}


export interface AllGrades{
  name: string;
  id: number;
}
