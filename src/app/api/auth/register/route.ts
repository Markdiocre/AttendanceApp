import { z } from "zod";
import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { handleServerError} from "@/services/server/error.service";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const registerSchema = z.object({
    email: z.string({
        required_error: "Email is required"
    }).email(),
    name: z.string().nullable(),
    password: z.string({
        required_error: "Password field cannot be blank",
    }).min(8, {
        message: "Must be 8 or more characters long"
    })
})

export async function POST(request: NextRequest) {
    try {
        const {email, name, password} = registerSchema.parse(await request.json());
        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await prisma.user.create({
            data:{
                email: email,
                name: name,
                password: hashedPassword
            }
        })

        if(!createdUser){
            return NextResponse.json({
                message: "Succesfully registered! Try logging in"
            }, {
                status: 200
            })
        }

        return NextResponse.json({
            message: "User not created"
        },{
            status: 400
        })

    } catch (err) {
        return handleServerError(err);
    }
}