import {connect} from "../../../dbConfig/dbConfig"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

await connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, username, password, appLanguage} = reqBody

        const foundEmail = await User.findOne({email})
        const foundUserName = await User.findOne({username})

        if (foundUserName || foundEmail) {
            return NextResponse.json({error: "Username or Email have used."}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User ({
            username, 
            email,
            password: hashedPassword,
            profile: {
                firstName: "",
                lastName: "",
                displayName: "",
                gender: "",
                dateOfBirth: "",
                country: ""
            },
            appLanguage
        })

        const savedUser = await newUser.save()

        if (savedUser) {
                return NextResponse.json({message: "User created successfully!"}, 
                {status: 201})
        } else if (!savedUser) {
            return NextResponse.json({error: "Couldn't save the information, Please try again."}, {status: 500})
        }

    } catch (err: any) {
        return NextResponse.json({error: `Error: ${err.message}`}, {status: 500})
    }
}