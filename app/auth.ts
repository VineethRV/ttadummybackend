'use server'
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload, TokenExpiredError } from "jsonwebtoken";
import { emitWarning } from "process";

const secretKey = process.env.JWT_SECRET_KEY || "bob";

const prisma=new PrismaClient();

export type loginPayloadType={
  email:string,
  hashedPass:string
}

export async function veirfyLogin(loginPayload:loginPayloadType):Promise<{status:number,token:string}>{
  try{
    const user= await prisma.user.findFirst({
      where: {email : loginPayload.email}
    })
    if(user && user.hashedPass==loginPayload.hashedPass){
      const token = jwt.sign(
        {
          email: user.email,
          id:user.id
        },
        secretKey
      );
      return {
        status:200,
        token:token
      }
    }
    throw {
      status:401,
      token:""
    }
  }
  catch{
    throw {
      status:404,
      token:""
    }
  }
}
export type User={
  id:number,
  name:string|null,
  organisation:string | null,
  role:string | null,
  department:string| null
}

export async function getPosition(JWTtoken:string):Promise<{status:number,user:User|null}> {
  try{
    //getting user id from token
    const jwtParsed=jwt.decode(JWTtoken) as jwt.JwtPayload;
    const userId=jwtParsed.id;
    const userEmail=jwtParsed.email;
    //find user info from DB using id
    try{
      const user=await prisma.user.findUnique({where:{id:userId}});
      if(user && user.email==userEmail){
        //successfull match,and has permission return values
        if(user.access){
          let retVal={
            id:user.id,
            name:user.name,
            organisation:user.organisation,
            role:user.role,
            department:user.department
          };
          return {
            status:200,
            user:retVal
          };
        }
        else{
          return{
            //not authorised
            status:400,
            user:null
          }
        }
      }
      else{
        //illegal request
        return {status:404,user:null}
      }
    }
    catch{
      //if the user isnt found
      return {status:404, user:null}
    }
  }
  catch{
    //server error ig
    return {status:500, user:null}
  }
}