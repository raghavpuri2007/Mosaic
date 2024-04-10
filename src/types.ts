export type Post = {
    id: string;
    content: string;
    image?: string;
    likes: number;
    author: User;
}

export type User = {
    id: string;
    name: string;
    position: string;
    image?: string;
    backImage?: string;
    about?: string;
    scores: Score[];
    experience?: Experience[];
}

export type Score = {
    gpa: number;
    weightedGPA: number;
    satScore: number;
    apScores: ApScore[];
}

export type ApScore = {
    subject: string;
    score: string;
    percentile: string;
}
export type Experience = {
    id: string;
    title: string;
    companyName: string;
    companyImage?: string;
}