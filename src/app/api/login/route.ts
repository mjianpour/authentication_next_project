
import {connect} from "../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

await connect(); 

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { userMail, password } = reqBody; 

    const user = await User.findOne({
        $or: [
        { email: userMail },  
        { username: userMail } 
    ]
    })

    if (!user) {
        return NextResponse.json({error: "Couldn't find the user, Please signup."}, {status: 404})
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password)

    if (!isPasswordValid) {
        return NextResponse.json(
            { error: "Invalid password" },
            { status: 401 } // 401 = Unauthorized
        );
    }

    if (isPasswordValid)
    {
        return NextResponse.json({message: "User verified.", 
            user: {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }},
            {status: 200})
    }

}