"use client"

import axios from "axios"
import { useRouter } from "next/navigation"

export default function Home () {

    const router = useRouter();

    async function handleLogOut() {
        try {
            const loggedOut = await axios.get("/api/logout")
            if (loggedOut) {
                console.log("Logout successsful")
            }
            router.push("/login")
        } catch (error:any) {
            console.log(error.message)
        }
    }

    return (
        <div>
            <button onClick={() => {handleLogOut()}}>Logout</button>
        </div>
    )
}