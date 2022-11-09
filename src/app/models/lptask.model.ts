export interface LPTask {
  taskId: number;
  step: number;
  difficulty: number;
  exercise: string;
  answer: number;
  type: string;
}

export interface LPTaskScore {
  A: {
    count: number,
    percentage: number
  },
  M: {
    count: number,
    percentage: number
  },
  S: {
    count: number,
    percentage: number},
  D: {
    count: number,
    percentage: number}
}
