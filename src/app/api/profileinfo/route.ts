
import {connect} from "../../../dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"
import User from "@/models/userModel";

await connect();

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, firstName, lastName, displayName, gender, dateOfBirth, country, isProfileEdited} = reqBody;

        const userInfoUpdated = await User.findOneAndUpdate({username}, 
            {
                $set: {
                    "profile.firstName": firstName,
                    "profile.lastName": lastName,
                    "profile.displayName": displayName, 
                    "profile.gender": gender,
                    "profile.dateOfBirth": dateOfBirth,
                    "profile.country": country,
                    "profile.isProfileEdited": isProfileEdited  // Moved inside profile
                }
            }, {new: true}
        )

        if (!userInfoUpdated) {
            return NextResponse.json({error: "User not found"}, {status: 404});
        }

        return NextResponse.json({message: "User information updated successfully."}, {status: 200});
        
    } catch (err) {
        console.error("Update error:", err);
        return NextResponse.json({error: `Error: ${err}`}, {status: 500});
    }
}