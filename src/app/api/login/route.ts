
import {connect} from "../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

await connect(); 

export async function POST(request: NextRequest) {
    const reqBody = await request.json();
    const { username, password } = reqBody; 

    const user = await User.findOne( 
        { username: username } )

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

    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email,
        isProfileEdited: user.profile.isProfileEdited
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, 
        {expiresIn: "30d"}
    )

    const response = NextResponse.json({message: "Login Successful", success: true})

    response.cookies.set("token", token, {httpOnly: true})

    return response
}