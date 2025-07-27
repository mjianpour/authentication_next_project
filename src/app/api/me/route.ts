import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDisplayName } from "next/dist/shared/lib/utils";

connect(); 

export async function GET(request: NextRequest) {
    try {
        const tokenData = await getDataFromToken(request);
        return NextResponse.json({
            displayName: tokenData.displayName || ""
        })
    } catch (err: any) {
        return NextResponse.json({error: err.message}, {status: 500})
    }
}