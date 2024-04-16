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
  clubs?: Club[];
  accolades?: Award[];
  athletics?: Athletic[];
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

export type Club = {
  id: string;
  name: string;
  logo: string;
  images: string[];
  roles: ClubRole[];
  description?: string; 
  awards: Award[]; 
};

export type ClubRole = {
  startYear: number;
  endYear: number;
  title: string;
  description: string;
};


export type Award = {
  title: string; 
  description: string; 
  image: string;
};

export type Athletic = {
  id: string;
  name: string;
  logo: string;
  description?: string;
  highlights: string[]; 
  images: string[]; 
  awards: Award[]; 
};