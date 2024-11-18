'use server'
import * as auth from './auth' 
import {  PrismaClient } from "@prisma/client";
import { statusCodes } from "./types/statusCodes";
import { table } from 'console';

const prisma=new PrismaClient();

function convertTableToString(timetable:string[][]):string{
    return timetable.map(row => row.join(",")).join(";");
}

type Teacher={
    name: string
    initials: string|null
    email: string|null
    department:string|null
    alternateDepartments:string|null
    timetable: string|null
    labtable: string|null
    organisation: string|null
}

export async function createTeachers(JWTtoken:string,name:string,initials:string|null=null,email:string|null=null,department:string|null=null,alternateDepartments:string|null=null,timetable:string[][]|null=null,labtable:string[][]|null=null):Promise<{status:number,teacher:Teacher|null}>{
    try{
        const {status,user}=await auth.getPosition(JWTtoken)
        if(status==statusCodes.OK && user){
            //check if teacher with same name dep and org exist
            const teachers=await prisma.teacher.findFirst({
                where:{
                    name:name,
                    department:department?department:user.department,
                    organisation:user.organisation
                }
            })
            //if even a single teacher exists
            if(teachers){
                return {
                    status:statusCodes.BAD_REQUEST,
                    teacher:null
                }
            }
            //else
            const teacher:Teacher={
                name:name,
                initials:initials,
                email:email,
                department:department?department:user.department?user.department:"no department",
                alternateDepartments:alternateDepartments,
                timetable:timetable?convertTableToString(timetable):"0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;",
                labtable:labtable?convertTableToString(labtable):"0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;0,0,0,0,0,0;",
                organisation:user.organisation
            }
            await prisma.teacher.create({
                data:teacher
            })
            return{
                status:statusCodes.CREATED,
                teacher:teacher
            }
        }
        //if status not ok
        return{
            status:status,
            teacher:null
        }
    }
    catch{
        return{
            status:statusCodes.INTERNAL_SERVER_ERROR,
            teacher:null
        }
    }
}

export async function getTeachers(JWTtoken:string):Promise<{status:number,teachers:Teacher[]|null}>{
    try{
       const {status,user}=await auth.getPosition(JWTtoken)
       if(status==statusCodes.OK && user){
            let teachers:Teacher[];
            if(user.role!='admin'){
                teachers=await prisma.teacher.findMany({
                    where:{
                        organisation:user.organisation,
                        department:user.department
                    },
                    select:{
                        name:true,
                        department:true,
                        initials:true
                    }
                })
                .then((teachers)=>
                    teachers.map((teacher)=>({
                        ...teacher,
                        email:null,
                        alternateDepartments:null,
                        organisation: user.organisation || null,
                        timetable: null, // Default value, since it's not queried
                        labtable: null, // Default value, since it's not queried
                    }))
                );
            }
            else{
                teachers=await prisma.teacher.findMany({
                    where:{
                        organisation:user.organisation,
                    },
                    select:{
                        name:true,
                        department:true,
                        initials:true
                    }
                })
                .then((teachers)=>
                    teachers.map((teacher)=>({
                        ...teacher,
                        email:null,
                        alternateDepartments:null,
                        organisation: user.organisation || null,
                        timetable: null, // Default value, since it's not queried
                        labtable: null, // Default value, since it's not queried
                    }))
                );
            }
            return {
                status:statusCodes.OK,
                teachers:teachers
            }

       }
       else{
            return {
                status:status,
                teachers:null
            }
       }
    }
    catch{
        return {
            status:statusCodes.INTERNAL_SERVER_ERROR,
            teachers:null
        }
    }
}

//have to add extra handeling for admins
export async function peekTeacher(
    token: string,
    name: string,
    department: string
  ): Promise<{ status: number; teacher: Teacher | null }> {
    try {
      //get position of user
      const { status, user } = await auth.getPosition(token);
      if (status == statusCodes.OK && user) {
        //find all the clasrooms in his lab
        const teacher = await prisma.teacher.findFirst({
          where: {
            name: name,
            department: department,
            organisation: user.organisation,
          },
          select: {
            name: true,
            organisation: true,
            department: true,
            alternateDepartments:true,
            initials:true,
            email:true,
            labtable:true,
            timetable: true,
          },
        });
        return {
          status: statusCodes.OK,
          teacher: teacher,
        };
      } 
      else {
        return {
          status: status,
          teacher: null,
        };
      }
    } catch {
      //internal error
      return {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        teacher: null,
      };
    }
  }