export type Post = {
  id: string;
  content: string;
  image?: string;
  likes: number;
  author: User;
};

export type User = {
  id: string;
  name: string;
  position: string;
  image?: string;
  backImage?: string;
  coverImage?: string;
  about?: string;
  scores: Score[];
  grades: grades;
  projects?: Project[];
};

export type Score = {
  satScore: number;
  actScore: number;
  apScores: ApScore[];
};

export type ApScore = {
  subject: string;
  score: string;
  percentile: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  skills: string[];
  projectImage: string;
};

export type grades = {
  gpa: number;
  weightedGPA: number;
  gpaPercentile: number;
  weightedGPAPercentile: number;
  transcript: transcript[];
};

export type transcript = {
  startYear: string;
  endYear: string;
  courses: courseGrade[];
};

export type courseGrade = {
  course: string;
  grade: string;
  AP: boolean;
  Period: number;
};
