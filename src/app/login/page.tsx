"use client"

import React, {useState, useEffect} from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

export default function Login () {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const [user, setUser] = useState({
            username: "",
            password: ""
        })

    useEffect(() => {
            setButtonDisabled(!(
                user.username.length > 0 &&
                user.password.length > 0
            ))
        }, [user.username, user.password])

    async function handleLoginClick() {
        try {
            setIsLoading(true)
            const response = await axios.post("/api/login", user)
            console.log(response.data)

            await new Promise(resolve => setTimeout(resolve, 100));

            const { data } = await axios.get('/api/me');
            
             if (data.displayName !== "") {
                router.push('/home');
            } else {
                router.push(`profileinfo/${user.username}`)
            }
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

        <label htmlFor="useremail">Username</label>
        <br/>
        <input 
        type="text"
        placeholder="Username"
        id="usermail"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}/>

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