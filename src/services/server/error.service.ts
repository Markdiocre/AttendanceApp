import { z } from "zod";
import { NextResponse } from "next/server";

async function handleZodError(err: z.ZodError) {
    return NextResponse.json({
        message: "Validation Error",
        details: err.errors.map(r => ({
            field: r.path.join("."),
            message: r.message
        }))
    })
}

async function handleDefaultError(err: any) {
    return NextResponse.json({
        message: "Something went wrong",
        err: err.message
    }, {
        status: 500
    })
}

export async function handleServerError(err: any){
    if (err instanceof z.ZodError) {
        return handleZodError(err);
    }

    return handleDefaultError(err);
}

