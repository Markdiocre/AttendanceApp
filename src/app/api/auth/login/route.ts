import { z } from "zod";
import { NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client";
import { handleServerError } from "@/services/server/error.service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }).email(),
  password: z.string({
    required_error: "Password is required"
  })
})

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const {email, password} = loginSchema.parse(await request.json());

    const singleUser = await prisma.user.findUnique({
      where:{
        email: email
      }
    })

    if(!singleUser){
      return NextResponse.json({
        message: "User doesnt exist. Are you registered?"
      }, {
        status: 401
      })
    }

    if(await bcrypt.compare(password, singleUser.password)){
      const token = jwt.sign({name: singleUser.name, email: singleUser.email}, "bruh", { expiresIn: 60 * 60 });

      return NextResponse.json({
        message: "Succesfully logged in!",
        token
      },{
        status: 200
      })
    }

    return NextResponse.json({
      message: "Username or password is incorrect"
    }, {
      status: 400
    })

  } catch (err: any) {
    return handleServerError(err);
  }

}
