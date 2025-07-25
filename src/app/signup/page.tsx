"use client"

import Link from "next/link"
import React, {useState, useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"

export default function Signup () {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false)

    const [user, setUser] = useState({
        email: "",
        username: "",
        password: ""
    })

    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        setButtonDisabled(!(
            user.email.length > 0 &&
            user.username.length > 0 &&
            user.password.length > 0
        ))
    }, [user.email, user.username, user.password])

    async function handleSignupClick () {
        try {
            setIsLoading(true)
            const response = await axios.post("api/signup", user)
            console.log(response.data)
            router.push(`profileinfo/${user.username}`)
        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
        <h1>Welcome to the app. Sign up to continue</h1>
        
        <br/>

        <label htmlFor="email">Email</label>
        <br/>
        <input 
        type="email"
        placeholder="Email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}/>

        <br/><br/>

        <label htmlFor="username">Username</label>
        <br/>
        <input 
        type="text"
        placeholder="Username"
        id="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}/>

        <br/><br/>

        <label htmlFor="password">Password</label>
        <br/>
        <input 
        type="password"
        placeholder="Password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}/>

        <br/><br/>

        <button disabled={buttonDisabled} onClick={() => {handleSignupClick()}}>Sign up</button>

        <br/>
        <span>Have an account?</span>
        <Link href="/login"> Click here.</Link>

        <br/><br/>
        <div>Continue via Google</div>
        <div>Continue via GitHub</div>

        <br/>
        {isLoading ? <h1>Loading...</h1>: <></>}
        </div>
    )
}