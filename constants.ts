
import { Semester, SemesterTimetable, SemesterResult, CalendarMonth } from './types';

export const USER_PROFILE = {
  name: "NIKETH P",
  regNo: "CB.PS.P2CHM25009",
  university: "AMRITA UNIVERSITY",
  campus: "Amrita Vishwa Vidyapeetham, Coimbatore Campus",
  school: "School of Physical Sciences",
  department: "Department of Chemistry",
  program: "M.Sc. Chemistry",
  batch: "2025-2027",
  email: "nikethp@student.amrita.edu",
  interests: ["Quantum Chemistry", "Organic Synthesis", "Molecular Spectroscopy"],
  avatar: "NP",
};

// Helper to generate full month data with specific overrides
const generateMonth = (month: string, year: number, daysInMonth: number, startDay: string, overrides: Record<number, {status?: 'H' | 'W', particulars?: string, cd?: string}>): CalendarMonth => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let dayIdx = dayNames.indexOf(startDay);
  
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = i + 1;
    const day = dayNames[dayIdx % 7];
    const isSunday = day === "Sun";
    const override = overrides[date] || {};
    
    dayIdx++;
    return {
      date,
      day,
      status: override.status || (isSunday ? 'H' : 'W'),
      particulars: override.particulars || (isSunday ? "Holiday" : ""),
      cd: override.cd
    };
  });

  return { monthName: month, year, days };
};

export const ACADEMIC_CALENDAR: CalendarMonth[] = [
  generateMonth("June", 2025, 30, "Sun", {
    1: { particulars: "Holiday" },
    5: { particulars: "Environment Day" },
    7: { status: 'H', particulars: "Holiday - Bakrid" },
    12: { particulars: "Teacher's Camp - Sadgamaya" },
    13: { particulars: "Teacher's Camp - Sadgamaya" },
    14: { particulars: "Teacher's Camp - Sadgamaya" },
    18: { particulars: "Commencement of classes for Higher semesters", cd: "CD 1" },
    19: { cd: "CD 2" }, 20: { cd: "CD 3" },
    21: { particulars: "Monday's Time Table / International Yoga Day", cd: "CD 4" },
    23: { cd: "CD 5" }, 24: { cd: "CD 6" }, 25: { cd: "CD 7" }, 26: { cd: "CD 8" }, 27: { cd: "CD 9" },
    28: { particulars: "Tuesday's Time Table", cd: "CD 10" },
    30: { cd: "CD 11" }
  }),
  generateMonth("July", 2025, 31, "Tue", {
    1: { cd: "CD 12" }, 2: { cd: "CD 13" }, 3: { cd: "CD 14" }, 4: { cd: "CD 15" },
    5: { particulars: "Wednesday's Time Table", cd: "CD 16" },
    6: { status: 'H', particulars: "Muharam - Holiday" },
    12: { status: 'H', particulars: "Holiday" },
    13: { status: 'H', particulars: "Holiday" },
    16: { particulars: "Commencement of Classes for First Semester - M.Tech / MSc", cd: "CD 24 / CD 1" },
    19: { particulars: "Thursday's Time Table", cd: "CD 27 / CD 4" },
    26: { status: 'H', particulars: "Holiday" },
    27: { status: 'H', particulars: "Holiday" },
    31: { particulars: "Commencement of Classes for First Semester - Int. MSc", cd: "CD 36 / CD 1" }
  }),
  generateMonth("August", 2025, 31, "Fri", {
    2: { particulars: "Friday's Time Table", cd: "CD 38 / CD 15 / CD 3" },
    9: { status: 'H', particulars: "Holiday" },
    10: { status: 'H', particulars: "Holiday" },
    15: { status: 'H', particulars: "Holiday - Independence Day" },
    16: { particulars: "Janmashtami (Float / Procession)" },
    18: { particulars: "Commencement of Classes for First Semester - B.Tech", cd: "CD 1" },
    20: { particulars: "Mid Semester Examinations for Higher semesters", cd: "CD 50 / CD 27 / CD 15 / CD 3" },
    23: { particulars: "Friday's Time Table", cd: "CD 53 / CD 30 / CD 18 / CD 6" },
    27: { status: 'H', particulars: "Holiday - Ganesh Chaturthi" },
    30: { status: 'H', particulars: "Holiday - Nimanjanam" }
  }),
  generateMonth("September", 2025, 30, "Mon", {
    5: { status: 'H', particulars: "Holiday - Onam / Miladi Nabi" },
    8: { particulars: "Mid Semester Examinations for First semester M.Tech / MSc", cd: "CD 62 / CD 39 / CD 27" },
    13: { particulars: "Wednesday's Time Table", cd: "CD 67 / CD 44 / CD 32 / CD 20" },
    20: { particulars: "Friday's Time table", cd: "CD 73 / CD 50 / CD 38 / CD 26" },
    27: { status: 'H', particulars: "Amma's Jayanthi" },
    29: { particulars: "Mid Semester Examinations for First semester Int.MSc/B.Sc", cd: "CD 79 / CD 56 / CD 44 / CD 32" }
  }),
  generateMonth("October", 2025, 31, "Wed", {
    1: { status: 'H', particulars: "Holiday - Mahanavami" },
    2: { status: 'H', particulars: "Holiday - Vijayadashami / Gandhi Jayanti" },
    4: { particulars: "Thursday's Time Table", cd: "CD 82 / CD 59 / CD 47" },
    11: { particulars: "Friday's Time Table", cd: "CD 88 / CD 65 / CD 53" },
    13: { particulars: "Mid Semester Examinations for First semester B.Tech", cd: "CD 89 / CD 66 / CD 54" },
    14: { particulars: "Last Working day for Higher semester", cd: "CD 90" },
    15: { particulars: "End Semester Examinations for Higher Semester begins" },
    18: { status: 'H', particulars: "Holiday" },
    19: { status: 'H', particulars: "Holiday - Diwali eve" },
    20: { status: 'H', particulars: "Holiday - Diwali" },
    21: { status: 'H', particulars: "Holiday" },
    25: { particulars: "Monday's TimeTable", cd: "CD 74 / CD 62 / CD 50" }
  }),
  generateMonth("November", 2025, 30, "Sat", {
    1: { particulars: "Tuesday's TimeTable", cd: "CD 80 / CD 68 / CD 56" },
    7: { particulars: "Sanskrit Conference", cd: "CD 85" },
    8: { status: 'H', particulars: "Holiday - Sanskrit Conference" },
    9: { status: 'H', particulars: "Holiday - Sanskrit Conference" },
    12: { particulars: "Commencement of classes for Higher semesters", cd: "CD 1" },
    14: { particulars: "Last Working day for First semester M.Tech / MSc", cd: "CD 90 / CD 78 / CD 66" },
    15: { particulars: "Wednesday's TimeTable", cd: "CD 4 / CD 79 / CD 67" },
    17: { particulars: "End Semester Examinations for First semester M.Tech / MSc", cd: "CD 5" },
    22: { status: 'H', particulars: "Holiday" },
    23: { status: 'H', particulars: "Holiday" },
    29: { particulars: "Last Working day for First semester Int. MSc/ B.Sc (Thursday's TimeTable)", cd: "CD 15 / CD 90 / CD 78" }
  }),
  generateMonth("December", 2025, 31, "Mon", {
    1: { particulars: "End Semester Examinations for First Semester Int M.Sc/B.Sc", cd: "CD 16 / CD 79" },
    3: { particulars: "Commencement of Classes for Second Semester M.Tech/M.Sc", cd: "CD 18 / CD 1 / CD 81" },
    6: { particulars: "Friday's TimeTable", cd: "CD 21 / CD 4 / CD 84" },
    13: { status: 'H', particulars: "Holiday" },
    14: { status: 'H', particulars: "Holiday" },
    15: { particulars: "Last Working day for First semester B.Tech", cd: "CD 27 / CD 10 / CD 90" },
    16: { particulars: "End Semester Examinations for First semester B.Tech", cd: "CD 28 / CD 11" },
    20: { particulars: "Monday's Time Table", cd: "CD 32 / CD 15" },
    22: { particulars: "Commencement of Classes for Second Semester Int M.Sc/B.Sc", cd: "CD 33 / CD 16 / CD 1" },
    25: { status: 'H', particulars: "Holiday - Christmas" }
  }),
  generateMonth("January", 2026, 31, "Thu", {
    1: { status: 'H', particulars: "Holiday - New Year" },
    3: { particulars: "Thursday's Time Table", cd: "CD 42 / CD 25 / CD 10" },
    5: { particulars: "Commencement of Classes Second Semester B.Tech", cd: "CD 43 / CD 26 / CD 11 / CD 1" },
    7: { particulars: "ANOKHA", cd: "CD 45 / CD 28 / CD 13 / CD 3" },
    8: { particulars: "ANOKHA", cd: "CD 46 / CD 29 / CD 14 / CD 4" },
    9: { particulars: "ANOKHA", cd: "CD 47 / CD 30 / CD 15 / CD 5" },
    12: { status: 'H', particulars: "Holiday- Pongal" },
    13: { status: 'H', particulars: "Holiday- Pongal" },
    14: { status: 'H', particulars: "Holiday- Pongal" },
    15: { status: 'H', particulars: "Holiday- Pongal" },
    16: { status: 'H', particulars: "Holiday- Pongal" },
    17: { status: 'H', particulars: "Holiday" },
    18: { status: 'H', particulars: "Holiday" },
    19: { particulars: "Mid Semester Examinations for Higher Semester Courses", cd: "CD 48 / CD 31 / CD 16 / CD 6" },
    24: { particulars: "Friday's Time Table", cd: "CD 53 / CD 36 / CD 21 / CD 11" },
    26: { status: 'H', particulars: "Republic Day" },
    31: { particulars: "Monday's Time Table", cd: "CD 58 / CD 41 / CD 26 / CD 16" }
  }),
  generateMonth("February", 2026, 28, "Sun", {
    1: { status: 'H', particulars: "Thai Poosam - Holiday" },
    2: { particulars: "Mid Semester Examinations for Second Semester M.Tech/M.Sc", cd: "CD 59 / CD 42 / CD 27 / CD 17" },
    7: { particulars: "Tuesday's Time Table", cd: "CD 64 / CD 47 / CD 32 / CD 22" },
    14: { status: 'H', particulars: "Holiday" },
    15: { status: 'H', particulars: "Holiday - Maha Shivaratri" },
    21: { particulars: "Wednesday's Time Table", cd: "CD 75 / CD 58 / CD 43 / CD 33" },
    23: { particulars: "Mid Semester Examinations for Second Semester Int M.Sc/B.Sc", cd: "CD 76 / CD 59 / CD 44 / CD 34" }
  }),
  generateMonth("March", 2026, 31, "Sun", {
    7: { particulars: "Thursday's Time Table", cd: "CD 86 / CD 69 / CD 54 / CD 44" },
    9: { particulars: "Mid Semester Examinations for Second Semester B.Tech", cd: "CD 87 / CD 70 / CD 55 / CD 45" },
    12: { particulars: "Last Working day for Higher Semenster Programs", cd: "CD 90 / CD 73 / CD 58 / CD 48" },
    16: { particulars: "End Semester Examinations for Higher Semester begins" },
    19: { status: 'H', particulars: "Holiday - Ugadi" },
    21: { particulars: "Friday's Time Table", cd: "CD 79 / CD 64 / CD 54" },
    31: { status: 'H', particulars: "Holiday- Mahavir Jayanthi" }
  }),
  generateMonth("April", 2026, 30, "Wed", {
    3: { status: 'H', particulars: "Holiday- Good Friday" },
    8: { particulars: "Last Working day for Second semester M.Tech/M.Sc", cd: "CD 90 / CD 75 / CD 65" },
    9: { particulars: "End Semester Examinations for Second semester M.Tech/M.Sc", cd: "CD 76 / CD 66" },
    11: { particulars: "Friday's Time Table", cd: "CD 78 / CD 68" },
    14: { status: 'H', particulars: "Holiday- Tamil New Year /Ambedkar Jayanti" },
    15: { particulars: "Vishu" },
    18: { particulars: "Tuesday's Time Table", cd: "CD 83 / CD 73" },
    28: { particulars: "Last Working day for Second semester Int M.Sc /B.Sc", cd: "CD 90 / CD 80" }
  }),
  generateMonth("May", 2026, 31, "Fri", {
    1: { status: 'H', particulars: "Holiday - May Day" },
    2: { particulars: "Friday's Time Table/End Semester Examinations for Second Semester Int M.Sc /B.Sc", cd: "CD 83" },
    12: { particulars: "Last Working day for Second semester B.Tech", cd: "CD 90" },
    13: { particulars: "End Semester Examinations for Second semester B.Tech" },
    27: { status: 'H', particulars: "Holiday - Bakrid" }
  }),
  generateMonth("June", 2026, 30, "Mon", {
    17: { particulars: "Commencement for Final Years of ASC,ASE, ASPS" },
    22: { particulars: "Commencement for Third Years of ASC,ASE, ASPS" },
    26: { status: 'H', particulars: "Holiday - Muharam" }
  }),
  generateMonth("July", 2026, 31, "Wed", {
    1: { particulars: "Commencement for Second Years of ASC,ASE, ASPS" },
    29: { particulars: "Guru Poornima" }
  })
];

export const RESULTS: SemesterResult[] = [
  {
    semesterId: 1,
    published: true,
    sgpa: 7.33,
    grades: [
      { courseCode: '22ADM501', grade: 'P', points: 4 },
      { courseCode: '25CHY501', grade: 'B+', points: 7 },
      { courseCode: '25CHY502', grade: 'B', points: 6 },
      { courseCode: '25CHY503', grade: 'B', points: 6 },
      { courseCode: '25CHY504', grade: 'B', points: 6 },
      { courseCode: '25CHY505', grade: 'B', points: 6 },
      { courseCode: '25CHY581', grade: 'A', points: 8 },
      { courseCode: '25CHY582', grade: 'B', points: 6 }
    ]
  },
  { semesterId: 2, published: false, sgpa: 0, grades: [] },
  { semesterId: 3, published: false, sgpa: 0, grades: [] },
  { semesterId: 4, published: false, sgpa: 0, grades: [] }
];

export const TIMETABLES: SemesterTimetable[] = [
  {
    semesterId: 1,
    entries: [
      {
        day: "Monday",
        slots: [
          { time: "08:50 - 12:25", courseCode: "25CHY581", type: "Lab", room: "D104", faculty: "Dr T S Boopathi" },
          { time: "14:05 - 14:55", courseCode: "25CHY504", type: "Lecture", room: "D105 AB2", faculty: "Dr Asha" },
          { time: "15:45 - 16:35", courseCode: "25CHY503", type: "Lecture", room: "D105 AB2", faculty: "Dr K Elango" }
        ]
      },
      {
        day: "Tuesday",
        slots: [
          { time: "08:50 - 12:25", courseCode: "25CHY582", type: "Lab", room: "Organic Lab", faculty: "Dr N Pandurangan" },
          { time: "14:05 - 14:55", courseCode: "25CHY503", type: "Lecture", room: "D305 AB2", faculty: "Dr K Elango" },
          { time: "14:55 - 15:45", courseCode: "25CHY502", type: "Lecture", room: "D305 AB2", faculty: "Dr D Gangadharan" }
        ]
      },
      {
        day: "Wednesday",
        slots: [
          { time: "08:50 - 09:40", courseCode: "25CHY503", type: "Lecture", room: "D105 AB2", faculty: "Dr K Elango" },
          { time: "09:40 - 11:35", courseCode: "CIR", type: "Other", room: "D104 AB2", faculty: "-" },
          { time: "11:35 - 12:25", courseCode: "25CHY504", type: "Lecture", room: "D205 AB2", faculty: "Dr Asha" },
          { time: "12:25 - 13:15", courseCode: "25CHY501", type: "Lecture", room: "D105 AB2", faculty: "Dr Venkata Ravi Kumar" },
          { time: "14:05 - 14:55", courseCode: "25CHY501", type: "Lecture", room: "D205 AB2", faculty: "Dr Venkata Ravi Kumar" },
          { time: "14:55 - 15:45", courseCode: "25CHY502", type: "Lecture", room: "D205 AB2", faculty: "Dr D Gangadharan" },
          { time: "15:45 - 16:35", courseCode: "25CHY505", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" }
        ]
      },
      {
        day: "Thursday",
        slots: [
          { time: "08:50 - 10:30", courseCode: "CIR", type: "Other", room: "D306 AB2", faculty: "-" },
          { time: "10:45 - 11:35", courseCode: "25CHY503", type: "Lecture", room: "D205 AB2", faculty: "Dr K Elango" },
          { time: "14:05 - 14:55", courseCode: "25CHY505", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" },
          { time: "14:55 - 15:45", courseCode: "25CHY505", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" }
        ]
      },
      {
        day: "Friday",
        slots: [
          { time: "08:50 - 09:40", courseCode: "25CHY502", type: "Lecture", room: "D105 AB2", faculty: "Dr D Gangadharan" },
          { time: "09:40 - 11:35", courseCode: "25CHY501", type: "Lecture", room: "D105 AB2", faculty: "Dr Venkata Ravi Kumar" },
          { time: "11:35 - 12:25", courseCode: "25CHY504", type: "Lecture", room: "D105 AB2", faculty: "Dr Asha" },
          { time: "14:05 - 14:55", courseCode: "CIR", type: "Other", room: "D104 AB2", faculty: "-" }
        ]
      }
    ]
  },
  {
    semesterId: 2,
    entries: [
      {
        day: "Monday",
        slots: [
          { time: "09:40 - 10:30", courseCode: "22ADM201", type: "Lecture", room: "D305 AB2", faculty: "Mr M Pramod Kumar" },
          { time: "10:45 - 11:35", courseCode: "25CHY511", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" },
          { time: "11:35 - 12:25", courseCode: "25CHY512", type: "Lecture", room: "D305 AB2", faculty: "Dr N Pandurangan" },
          { time: "12:25 - 13:15", courseCode: "25CHY515", type: "Lecture", room: "D305 AB2", faculty: "Dr R Yamuna" },
          { time: "14:05 - 14:55", courseCode: "25CHY513", type: "Lecture", room: "D305 AB2", faculty: "Dr Venkata Ravi Kumar" },
          { time: "14:55 - 15:45", courseCode: "25CHY514", type: "Lecture", room: "D305 AB2", faculty: "Dr K Elango" }
        ]
      },
      {
        day: "Tuesday",
        slots: [
          { time: "08:50 - 12:25", courseCode: "25CHY583", type: "Lab", room: "Physical Lab", faculty: "Dr Thilagavathy" },
          { time: "14:05 - 14:55", courseCode: "25CHY511", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" },
          { time: "14:55 - 15:45", courseCode: "25CHY513", type: "Lecture", room: "D305 AB2", faculty: "Dr Venkata Ravi Kumar" },
          { time: "15:45 - 16:35", courseCode: "25CHY515", type: "Lecture", room: "D305 AB2", faculty: "Dr R Yamuna" }
        ]
      },
      {
        day: "Wednesday",
        slots: [
          { time: "08:50 - 12:25", courseCode: "25CHY584", type: "Lab", room: "Inorganic Lab", faculty: "Dr Venkata Ravi Kumar" },
          { time: "14:05 - 14:55", courseCode: "25CHY515", type: "Lecture", room: "D305 AB2", faculty: "Dr R Yamuna" },
          { time: "14:55 - 15:45", courseCode: "25CHY514", type: "Lecture", room: "D305 AB2", faculty: "Dr K Elango" }
        ]
      },
      {
        day: "Thursday",
        slots: [
          { time: "09:40 - 10:30", courseCode: "25CHY511", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" },
          { time: "12:25 - 13:15", courseCode: "25CHY514", type: "Lecture", room: "D305 AB2", faculty: "Dr K Elango" },
          { time: "14:05 - 14:55", courseCode: "25CHY512", type: "Lecture", room: "D305 AB2", faculty: "Dr N Pandurangan" },
          { time: "14:55 - 15:45", courseCode: "25CHY513", type: "Lecture", room: "D305 AB2", faculty: "Dr Venkata Ravi Kumar" }
        ]
      },
      {
        day: "Friday",
        slots: [
          { time: "09:40 - 11:35", courseCode: "25AVP501", type: "Lecture", room: "D305 AB2", faculty: "Dr T S Boopathi" },
          { time: "11:35 - 12:25", courseCode: "25CHY513", type: "Lecture", room: "D305 AB2", faculty: "Dr Venkata Ravi Kumar" },
          { time: "12:25 - 13:15", courseCode: "25CHY514", type: "Lecture", room: "D305 AB2", faculty: "Dr K Elango" },
          { time: "14:05 - 14:55", courseCode: "25CHY512", type: "Lecture", room: "D305 AB2", faculty: "Dr N Pandurangan" },
          { time: "14:55 - 15:45", courseCode: "25CHY511", type: "Lecture", room: "D305 AB2", faculty: "Dr Thilagavathy" }
        ]
      }
    ]
  }
];

export const SYLLABUS: Semester[] = [
  {
    id: 1,
    courses: [
      { code: '25CHY501', title: 'Quantum Chemistry', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Postulates of Quantum Mechanics', 'Schrodinger Wave Equation', 'Particle in a Box', 'Harmonic Oscillator', 'Hydrogen Atom', 'Approximation Methods'] },
      { code: '25CHY505', title: 'Group Theory and its Applications', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Symmetry Elements and Operations', 'Point Groups', 'Character Tables', 'Applications in Spectroscopy', 'Chemical Bonding Applications'] },
      { code: '25CHY502', title: 'Concepts in Inorganic Chemistry', l: 3, t: 1, p: 0, credits: 3, type: 'Theory', topics: ['Atomic Structure', 'Chemical Bonding', 'Main Group Elements', 'Acids and Bases', 'Solid State Chemistry'] },
      { code: '25CHY503', title: 'Principles in Organic Chemistry', l: 3, t: 0, p: 0, credits: 4, type: 'Theory', topics: ['Stereochemistry', 'Reaction Intermediates', 'Aromaticity', 'Nucleophilic Substitution', 'Elimination Reactions'] },
      { code: '25CHY504', title: 'Coordination Chemistry', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Bonding in Coordination Compounds', 'Crystal Field Theory', 'Electronic Spectra', 'Magnetic Properties', 'Thermodynamic Stability'] },
      { code: '25CHY581', title: 'Inorganic Semi-micro Qualitative Analysis Lab', l: 0, t: 0, p: 5, credits: 2, type: 'Lab', topics: ['Separation of Cations', 'Identification of Rare Earth Elements', 'Microscale Techniques'] },
      { code: '25CHY582', title: 'Organic Quantitative Analysis Lab', l: 0, t: 0, p: 5, credits: 2, type: 'Lab', topics: ['Estimation of Functional Groups', 'Saponification Value', 'Iodine Value', 'Purity Analysis'] },
      { code: '22ADM501', title: 'Glimpses of Indian Culture', l: 2, t: 0, p: 0, credits: 2, type: 'Foundation', topics: ['Vedic Heritage', 'Indian Philosophy', 'Ancient Sciences', 'Arts and Literature'] }
    ]
  },
  {
    id: 2,
    courses: [
      { code: '25CHY511', title: 'Chemical Thermodynamics and Equilibrium', l: 3, t: 1, p: 0, credits: 4, type: 'Theory', topics: ['Laws of Thermodynamics', 'Statistical Thermodynamics', 'Chemical Equilibrium', 'Phase Transitions', 'Non-ideal Systems'] },
      { code: '25CHY513', title: 'Molecular Spectroscopy', l: 3, t: 1, p: 0, credits: 4, type: 'Theory', topics: ['Rotational Spectroscopy', 'Vibrational Spectroscopy', 'Electronic Spectroscopy', 'NMR Spectroscopy', 'EPR and Mossbauer'] },
      { code: '25CHY514', title: 'Organic Reaction Mechanism', l: 3, t: 1, p: 0, credits: 4, type: 'Theory', topics: ['Addition Reactions', 'Rearrangements', 'Photochemistry', 'Pericyclic Reactions', 'Free Radical Reactions'] },
      { code: '25CHY512', title: 'Heterocyclic and Natural Products Chemistry', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Synthesis of Heterocycles', 'Alkaloids', 'Terpenoids', 'Steroids', 'Carbohydrates'] },
      { code: '25CHY515', title: 'Organometallic Chemistry', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Metal Carbonyls', 'Metallocenes', 'Catalysis', 'Bio-organometallic Chemistry', 'Ligand Substitution'] },
      { code: '25CHY583', title: 'Advanced Physical Chemistry Lab', l: 0, t: 0, p: 5, credits: 2, type: 'Lab', topics: ['Adsorption Isotherms', 'Kinetics Studies', 'Conductometry', 'Potentiometry'] },
      { code: '25CHY584', title: 'Inorganic Quantitative Analysis Lab', l: 0, t: 0, p: 5, credits: 2, type: 'Lab', topics: ['Volumetric Analysis', 'Gravimetric Analysis', 'Complexometry', 'Alloy Analysis'] },
      { code: '22ADM201', title: 'Strategic Lessons from Mahabharata', l: 1, t: 0, p: 0, credits: 1, type: 'Foundation', topics: ['Leadership Principles', 'Ethics in Conflict', 'Strategic Decisions', 'Vedic Wisdom'] },
      { code: '25AVP501', title: 'Mastery Over Mind', l: 1, t: 0, p: 2, credits: 2, type: 'Foundation', topics: ['Meditation Techniques', 'Stress Management', 'Self-Awareness', 'Cognitive Focus'] }
    ]
  },
  {
    id: 3,
    courses: [
      { code: '25CHY602', title: 'Electrochemistry, Kinetics and Surface Chemistry', l: 3, t: 1, p: 0, credits: 4, type: 'Theory', topics: ['Interface Phenomena', 'Electrochemical Cells', 'Corrosion', 'Chemical Kinetics', 'Homogeneous and Heterogeneous Catalysis'] },
      { code: '25CHY604', title: 'Synthetic Strategies and Reagents', l: 3, t: 1, p: 0, credits: 4, type: 'Theory', topics: ['Retrosynthetic Analysis', 'Protective Groups', 'Organometallic Reagents in Synthesis', 'Oxidizing and Agents'] },
      { code: '25CHY603', title: 'Solid State Chemistry and Material Science', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Crystal Structure Analysis', 'Defects in Solids', 'Nanomaterials', 'Superconductors', 'Optical and Magnetic Materials'] },
      { code: '25CHY601', title: 'Bioinorganic Chemistry', l: 3, t: 0, p: 0, credits: 3, type: 'Theory', topics: ['Metals in Biological Systems', 'Oxygen Carriers', 'Metalloenzymes', 'Metals in Medicine', 'Nitrogen Fixation'] },
      { code: '25CHY682', title: 'Organic Qualitative Analysis Lab', l: 0, t: 0, p: 5, credits: 2, type: 'Lab', topics: ['Multistep Synthesis', 'Separation of Mixtures', 'Characterization by Spectral Data'] },
      { code: '25CHY681', title: 'Instrumental and Analytical Methods Lab', l: 0, t: 0, p: 5, credits: 2, type: 'Lab', topics: ['UV-Vis Spectroscopy', 'FTIR Spectroscopy', 'HPLC/GC Basics', 'Thermal Analysis'] }
    ]
  },
  {
    id: 4,
    courses: [
      { code: '25CHY699', title: 'Dissertation', l: 0, t: 0, p: 0, credits: 14, type: 'Project', topics: ['Research Proposal', 'Literature Review', 'Experimental Design', 'Data Analysis', 'Thesis Writing', 'Viva Voce'] }
    ]
  }
];
