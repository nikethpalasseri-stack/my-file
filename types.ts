
export interface Course {
  code: string;
  title: string;
  l: number;
  t: number;
  p: number;
  credits: number;
  type: 'Theory' | 'Lab' | 'Project' | 'Foundation';
  topics: string[];
}

export interface Semester {
  id: number;
  courses: Course[];
}

export interface StudyNote {
  title: string;
  summary: string;
  keyPoints: string[];
  examTips: string[];
  references: { title: string; url: string }[];
}

export interface Grade {
  courseCode: string;
  grade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';
  points: number;
}

export interface SemesterResult {
  semesterId: number;
  grades: Grade[];
  sgpa: number;
  published: boolean;
}

export interface TimetableSlot {
  time: string;
  courseCode: string;
  type: 'Lecture' | 'Lab' | 'Tutorial' | 'Other';
  room: string;
  faculty?: string;
}

export interface TimetableEntry {
  day: string;
  slots: TimetableSlot[];
}

export interface SemesterTimetable {
  semesterId: number;
  entries: TimetableEntry[];
}

export interface CalendarEntry {
  date: number;
  day: string;
  status: 'H' | 'W';
  particulars?: string;
  cd?: string; // Class Day count for relevant semesters
}

export interface CalendarMonth {
  monthName: string;
  year: number;
  days: CalendarEntry[];
}
