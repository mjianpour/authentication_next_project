import { NextRequest } from "next/server";
import  jwt from "jsonwebtoken";

export async function getDataFromToken (request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || "";

        // Verify method extracts the information as well as verifying the token as the response of our function. 
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);

        return decodedToken;

    } catch (error: any) {
        throw new Error(error.message)
    }
}