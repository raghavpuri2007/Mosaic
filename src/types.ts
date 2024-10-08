export type Post = {
  id: string;
  content: string;
  image?: string;
  user: User;
  type: String;
};

export type User = {
  name?: string;
  position?: string;
  image?: string;
  backImage?: string;
  coverImage?: string;
  theme?: string;
  about?: string;
  scores?: Score;
  grades?: grades;
  projects?: Project[];
  clubs?: Club[];
  accolades?: Award[];
  athletics?: Athletic[];
  performingArts?: PerformingArt[];
  volunteering?: Volunteering[];
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
  images: Array<{ key: string; caption: string }>;
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
};

export type Athletic = {
  id: string;
  name: string;
  description?: string;
  highlights: Array<{ key: string; caption: string }>;
  images: Array<{ key: string; caption: string }>;
  awards: Award[];
};

export type PerformingArt = {
  id: string;
  name: string;
  description?: string;
  videos: Array<{ key: string; caption: string }>;
  images: Array<{ key: string; caption: string }>;
  awards: Award[];
};

export type Volunteering = {
  id: string;
  name: string;
  impact?: string;
  images: Array<{ key: string; caption: string }>;
  events: Array<{
    title: string;
    startYear: number;
    endYear: number;
    description: string;
  }>;
};
