import * as auth from'./app/authentication' 
import { PrismaClient } from "@prisma/client";
import { read } from 'fs';
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { emitWarning } from 'process';

const secretKey = process.env.JWT_SECRET_KEY || "bob";

const prisma=new PrismaClient();


type User={
  name:string,
  email :string,
  hashedPass :string,
  organisation: string,
  role :string,
  access :boolean,
  department :string,
}
let JWTtoken:string[]=[jwt.sign(
    {
        email:"vineethrao50@gmail.com",
        id:3
    },
    secretKey
),jwt.sign(
  {
      email:"john.doe@example.com",
      id:2
  },
  secretKey
),
jwt.sign(
  {
      email:"jane.smith@example.com",
      id:3
  },
  secretKey
),jwt.sign(
  {
      email:"alice.j@example.com",
      id:4
  },
  secretKey
),jwt.sign(
  {
      email:"bob.brown@example.com",
      id:5
  },
  secretKey
),]

const users: User[] = [
    {
      name: "Vineeth",
      email: "vineethrao50@gmail.com",
      hashedPass: "hashedPass123",
      organisation: "RVCE",
      role: "TTO",
      access: true,
      department: "CSE",
    },
    {
      name: "John Doe",
      email: "john.doe@example.com",
      hashedPass: "hashedPass456",
      organisation: "MIT",
      role: "Professor",
      access: false,
      department: "ECE",
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      hashedPass: "hashedPass789",
      organisation: "Stanford",
      role: "Researcher",
      access: true,
      department: "AI",
    },
    {
      name: "Alice Johnson",
      email: "alice.j@example.com",
      hashedPass: "hashedPass101",
      organisation: "CMU",
      role: "Student",
      access: false,
      department: "ML",
    },
    {
      name: "Bob Brown",
      email: "bob.brown@example.com",
      hashedPass: "hashedPass202",
      organisation: "Harvard",
      role: "Dean",
      access: true,
      department: "IT",
    },
];


async function addpeople(users:User[]) {
    await prisma.user.createMany({
        data:users
    })
}


async function readPeople() {
  let all=await prisma.user.findMany()
  console.log(all)
}


async function print() {
  let bob=await auth.getPosition(JWTtoken[0])
  console.log(bob)
}
print()