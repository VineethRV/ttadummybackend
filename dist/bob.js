"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt = require("jsonwebtoken");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const secretKey = "bob";
app.use(express_1.default.json());
//send post request with {"Usrname":"bob", "hashPass":123} body
app.post('/login', (req, res) => {
    try {
        if (req.body.hashPass != 123) {
            throw 1;
        }
        res.send(jwt.sign({
            usrName: req.body.Usrname,
            usrOrg: "RVCE",
            usrRole: "editor",
            usrDep: "CSE"
        }, "bob"));
    }
    catch (_a) {
        res.status(404).send();
    }
});
function verifyToken(req, res, next) {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]) || "";
    console.log(token);
    try {
        jwt.verify(token, "bob");
    }
    catch (_b) {
        console.log("failed");
        res.status(404);
    }
    next();
}
//room response place get request to /getRooms, with authorization as jwt token. 
const rooms = [
    { name: 'Room A', department: 'Computer Science', labornot: true },
    { name: 'Room B', department: 'Computer Science', labornot: false },
    { name: 'Room C', department: 'Computer Science', labornot: true },
    { name: 'Room D', department: 'Computer Science', labornot: false },
    { name: 'Room E', department: 'Computer Science', labornot: true },
    { name: 'Room F', department: 'Computer Science', labornot: false },
    { name: 'Room G', department: 'Computer Science', labornot: true }
];
app.get('/getRooms', verifyToken, (req, res) => {
    const statusCode = res.statusCode;
    if (statusCode == 404) {
        res.json({
            msg: "User is not authenticated"
        });
    }
    else {
        res.json(rooms);
    }
});
const teachers = [
    { name: 'John Doe', initials: 'JD', email: 'johndoe@example.com', dept: 'Computer Science' },
    { name: 'Jane Smith', initials: 'JS', email: 'janesmith@example.com', dept: 'Mathematics' },
    { name: 'John Doe', initials: 'JD', email: 'johndoe@example.com', dept: 'Computer Science' },
    { name: 'Jane Smith', initials: 'JS', email: 'janesmith@example.com', dept: 'Mathematics' },
    { name: 'John Doe', initials: 'JD', email: 'johndoe@example.com', dept: 'Computer Science' },
    { name: 'Jane Smith', initials: 'JS', email: 'janesmith@example.com', dept: 'Mathematics' },
    { name: 'John Doe', initials: 'JD', email: 'johndoe@example.com', dept: 'Computer Science' },
    { name: 'Jane Smith', initials: 'JS', email: 'janesmith@example.com', dept: 'Mathematics' }
];
//teacher get same shit
app.get('/getTeachers', verifyToken, (req, res) => {
    const statusCode = res.statusCode;
    if (statusCode == 404) {
        res.json({
            msg: "User is not authenticated"
        });
    }
    else {
        res.json(teachers);
    }
});
const subjects = [
    { name: 'Computer Science I', code: 'CS101', semester: 1, dept: 'Computer Science' },
    { name: 'Discrete Mathematics', code: 'MA202', semester: 2, dept: 'Mathematics' },
    { name: 'Computer Science I', code: 'CS101', semester: 1, dept: 'Computer Science' },
    { name: 'Discrete Mathematics', code: 'MA202', semester: 2, dept: 'Mathematics' },
    { name: 'Computer Science I', code: 'CS101', semester: 1, dept: 'Computer Science' },
    { name: 'Discrete Mathematics', code: 'MA202', semester: 2, dept: 'Mathematics' },
    { name: 'Computer Science I', code: 'CS101', semester: 1, dept: 'Computer Science' },
    { name: 'Discrete Mathematics', code: 'MA202', semester: 2, dept: 'Mathematics' },
    // ... more subjects
];
app.get('/getSubjects', verifyToken, (req, res) => {
    const statusCode = res.statusCode;
    if (statusCode == 404) {
        res.json({
            msg: "User is not authenticated"
        });
    }
    else {
        res.json(subjects);
    }
});
const labs = [
    { name: 'Computer Lab 1', sem: 1, batches: ['A', 'B', 'C'], dept: 'Computer Science' },
    { name: 'Physics Lab', sem: 2, batches: ['D', 'E'], dept: 'Physics' },
    { name: 'Computer Lab 1', sem: 1, batches: ['A', 'B', 'C'], dept: 'Computer Science' },
    { name: 'Physics Lab', sem: 2, batches: ['D', 'E'], dept: 'Physics' },
    { name: 'Computer Lab 1', sem: 1, batches: ['A', 'B', 'C'], dept: 'Computer Science' },
    { name: 'Physics Lab', sem: 2, batches: ['D', 'E'], dept: 'Physics' }
    // ... more labs
];
app.get('/getLabs', verifyToken, (req, res) => {
    const statusCode = res.statusCode;
    if (statusCode == 404) {
        res.json({
            msg: "User is not authenticated"
        });
    }
    else {
        res.json(labs);
    }
});
app.get('/peekRoom', verifyToken, (req, res) => {
    const roomName = req.headers['room-name']; // Assuming the room name is sent in the 'room-name' header
    console.log("room name", roomName);
    if (!roomName) {
        res.status(404).json({ error: 'Room not found' });
        return;
    }
    // Create the response object
    const response = {
        name: roomName,
        dept: "cse",
        lab: 1,
        timetable: [
            // Assuming a 6x6 timetable for each day
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ]
    };
    // Populate the timetable with actual data (if available)
    // ... (code to fetch timetable data from a database or other source)
    res.json(response);
});
app.get('/peekTeacher', verifyToken, (req, res) => {
    const teacherName = req.headers['teacher-name'];
    // Find the teacher based on the teacherName
    const teacher = {
        "name": "Bob",
        "initials": "BB",
        "email": "bob@gmail.com",
        "dept": "cse"
    };
    if (!teacherName) {
        res.status(404).json({ error: 'Teacher not found' });
        return;
    }
    // Create the response object
    const response = {
        name: teacher.name,
        initials: teacher.initials,
        email: teacher.email,
        dept: teacher.dept,
        timetable: [
            // Assuming a 6x6 timetable for each day
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null],
            [null, null, null, null, null, null]
        ]
    };
    res.json(response);
});
app.get('/peekSubject', verifyToken, (req, res) => {
    const subjectCode = req.headers['subject-code'];
    // Validate subject code presence
    if (!subjectCode) {
        res.status(400).json({ error: 'Missing subject code in query parameter' });
        return;
    }
    // Replace with actual data retrieval logic
    const subject = {
        name: 'Computer Science 101',
        code: 'CS101',
        credits: 3,
        specialRooms: ['Lab 1', 'Lab 2'],
        semester: 1,
        dept: 'Computer Science'
    };
    res.json(subject);
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
