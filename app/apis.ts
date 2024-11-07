'use server'
let jwt=require('jsonwebtoken')

const secretKey = "bob"; // Secret key for signing JWT

// Mock data for rooms, teachers, etc.
const rooms = [
  { name: 'Room A', department: 'Computer Science', labornot: true },
  { name: 'Room B', department: 'Computer Science', labornot: false },
  // other rooms
];

const teachers = [
  { name: 'John Doe', initials: 'JD', email: 'johndoe@example.com', dept: 'Computer Science' },
  { name: 'Jane Smith', initials: 'JS', email: 'janesmith@example.com', dept: 'Mathematics' },
  // other teachers
];

const subjects = [
  { name: 'Computer Science I', code: 'CS101', semester: 1, dept: 'Computer Science' },
  { name: 'Discrete Mathematics', code: 'MA202', semester: 2, dept: 'Mathematics' },
  // other subjects
];

const labs = [
  { name: 'Computer Lab 1', sem: 1, batches: ['A', 'B', 'C'], dept: 'Computer Science' },
  { name: 'Physics Lab', sem: 2, batches: ['D', 'E'], dept: 'Physics' },
  // other labs
];

// **Authenticate User Function**: Verifies if the user is authenticated
export const checkAuthentication = (token: string): boolean => {
  try {
    jwt.verify(token, secretKey); // Verifies the token using the secret key
    return true; // If token is valid, return true
  } catch {
    return false; // If token verification fails, return false
  }
};

// **Login Function**: Generates JWT token if credentials are valid
export const login = async (usrName: string, hashPass: number): Promise<string | null> => {
  if (hashPass !== 123) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { usrName, usrOrg: "RVCE", usrRole: "editor", usrDep: "CSE" },
    secretKey
  );

  return token; // Return generated JWT token
};

// **Get Rooms Function**: Checks authentication before returning room data
export const getRooms = async (token: string): Promise<any[] | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }
  return rooms; // Return the list of rooms if authenticated
};

// **Get Teachers Function**: Checks authentication before returning teacher data
export const getTeachers = async (token: string): Promise<any[] | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }
  return teachers; // Return the list of teachers if authenticated
};

// **Get Subjects Function**: Checks authentication before returning subject data
export const getSubjects = async (token: string): Promise<any[] | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }
  return subjects; // Return the list of subjects if authenticated
};

// **Get Labs Function**: Checks authentication before returning lab data
export const getLabs = async (token: string): Promise<any[] | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }
  return labs; // Return the list of labs if authenticated
};

// **Peek Room Function**: Checks authentication before returning room details
export const peekRoom = async (token: string, roomName: string): Promise<any | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }

  if (!roomName) {
    throw new Error("Room not found");
  }

  return {
    name: roomName,
    dept: "cse",
    lab: 1,
    timetable: [
      [null, null, null, null, null, null],
      [null, null, null, null, null, null],
      // other time slots
    ]
  };
};

// **Peek Teacher Function**: Checks authentication before returning teacher details
export const peekTeacher = async (token: string, teacherName: string): Promise<any | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }

  if (!teacherName) {
    throw new Error("Teacher not found");
  }

  return {
    name: "Bob",
    initials: "BB",
    email: "bob@gmail.com",
    dept: "cse",
    timetable: [
      [null, null, null, null, null, null],
      // other time slots
    ]
  };
};

// **Peek Subject Function**: Checks authentication before returning subject details
export const peekSubject = async (token: string, subjectCode: string): Promise<any | string> => {
  if (!checkAuthentication(token)) {
    throw new Error("User is not authenticated");
  }

  if (!subjectCode) {
    throw new Error("Missing subject code");
  }

  return {
    name: 'Computer Science 101',
    code: 'CS101',
    credits: 3,
    specialRooms: ['Lab 1', 'Lab 2'],
    semester: 1,
    dept: 'Computer Science'
  };
};
