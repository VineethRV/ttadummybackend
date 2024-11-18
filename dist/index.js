"use strict";
'use server';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.peekSubject = exports.peekTeacher = exports.peekRoom = exports.getLabs = exports.getSubjects = exports.getTeachers = exports.getRooms = exports.login = exports.checkAuthentication = void 0;
const jwt = require('jsonwebtoken');
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
const checkAuthentication = (token) => {
    try {
        jwt.verify(token, secretKey); // Verifies the token using the secret key
        return true; // If token is valid, return true
    }
    catch (_a) {
        return false; // If token verification fails, return false
    }
};
exports.checkAuthentication = checkAuthentication;
// **Login Function**: Generates JWT token if credentials are valid
const login = (usrName, hashPass) => __awaiter(void 0, void 0, void 0, function* () {
    if (hashPass !== 123) {
        throw new Error("Invalid password");
    }
    const token = jwt.sign({ usrName, usrOrg: "RVCE", usrRole: "editor", usrDep: "CSE" }, secretKey);
    return token; // Return generated JWT token
});
exports.login = login;
// **Get Rooms Function**: Checks authentication before returning room data
const getRooms = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
        throw new Error("User is not authenticated");
    }
    return rooms; // Return the list of rooms if authenticated
});
exports.getRooms = getRooms;
// **Get Teachers Function**: Checks authentication before returning teacher data
const getTeachers = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
        throw new Error("User is not authenticated");
    }
    return teachers; // Return the list of teachers if authenticated
});
exports.getTeachers = getTeachers;
// **Get Subjects Function**: Checks authentication before returning subject data
const getSubjects = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
        throw new Error("User is not authenticated");
    }
    return subjects; // Return the list of subjects if authenticated
});
exports.getSubjects = getSubjects;
// **Get Labs Function**: Checks authentication before returning lab data
const getLabs = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
        throw new Error("User is not authenticated");
    }
    return labs; // Return the list of labs if authenticated
});
exports.getLabs = getLabs;
// **Peek Room Function**: Checks authentication before returning room details
const peekRoom = (token, roomName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
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
});
exports.peekRoom = peekRoom;
// **Peek Teacher Function**: Checks authentication before returning teacher details
const peekTeacher = (token, teacherName) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
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
});
exports.peekTeacher = peekTeacher;
// **Peek Subject Function**: Checks authentication before returning subject details
const peekSubject = (token, subjectCode) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(0, exports.checkAuthentication)(token)) {
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
});
exports.peekSubject = peekSubject;
