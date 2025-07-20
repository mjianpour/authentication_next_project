"use client"

import React, {useState, useEffect} from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Signup () {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [user, setUser] = useState({
            userMail: "",
            password: ""
        })

    useEffect(() => {
            setButtonDisabled(!(
                user.userMail.length > 0 &&
                user.password.length > 0
            ))
        }, [user.userMail, user.password])

    async function handleLoginClick() {
        try {
            setIsLoading(true)
            const response = await axios.post("api/login", user)
            console.log(response.data)
            router.push("/home")
        } catch (error) {
        console.log(`Error message: ${error}`)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
        <h1>Welcome, Login to continue</h1>
        
        <br/>

        <label htmlFor="useremail">Username or Email</label>
        <br/>
        <input 
        type="text"
        placeholder="Username or Email"
        id="usermail"
        value={user.userMail}
        onChange={(e) => setUser({...user, userMail: e.target.value})}/>

        <br/><br/>

        <label htmlFor="email">Password</label>
        <br/>
        <input 
        type="password"
        placeholder="Password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}/>

        <br/><br/>

        <button disabled={buttonDisabled} onClick={() => {handleLoginClick()}}>Login</button>

        <br/>
        <span>Don't Have an account?</span>
        <Link href="/signup"> Click here.</Link>

        <br/><br/>
        <div>Continue via Google</div>
        <div>Continue via GitHub</div>

        <br/>
        {isLoading ? <h1>Loading...</h1>: <></>}
        </div>
    )
}