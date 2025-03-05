import {z} from "zod";
import {NextResponse} from "next/server";

interface LoginInterface{
  email: String,
  password: String
}

const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }).email()
})

export async function POST(request: Request){
  console.log(request.body)
  try{

   loginSchema.parse(await request.json());
    return NextResponse.json({
      message: "Successfully logged in!"
    },{
        status: 200
      })
    
  }catch(err){
    if(err instanceof z.ZodError){
    return NextResponse.json({
        message: "Validation Error",
        details: err.errors.map(r => ({
          field: r.path.join("."),
          message: r.message
        }))
      })     
    }
  }

}
