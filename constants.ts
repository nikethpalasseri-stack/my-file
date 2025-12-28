
import { Semester, SemesterTimetable, SemesterResult } from './types';

export const USER_PROFILE = {
  name: "NIKETH P",
  regNo: "CB.PS.P2CHM25009",
  university: "Amrita Vishwa Vidyapeetham",
  campus: "Coimbatore Campus",
  school: "School of Physical Sciences",
  department: "Department of Chemistry",
  program: "M.Sc. Chemistry",
  batch: "2025-2027",
  email: "nikethp@student.amrita.edu",
  interests: ["Quantum Chemistry", "Organic Synthesis", "Molecular Spectroscopy"],
  avatar: "NP",
  // Photo property removed as requested. User can still add one via the Profile interface.
};

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
      { code: '25CHY604', title: 'Synthetic Strategies and Reagents', l: 3, t: 1, p: 0, credits: 4, type: 'Theory', topics: ['Retrosynthetic Analysis', 'Protective Groups', 'Organometallic Reagents in Synthesis', 'Oxidizing and Reducing Agents'] },
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
