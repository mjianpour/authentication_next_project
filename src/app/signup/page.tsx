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
        password: "",
        appLanguage: "En"
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
            router.push(`/login`)
        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    interface LanguageTexts {
        welcomeText: string;
        email: String,
        username: string;
        password: string;
        signup: string;
        switchText: string;
        clickHere: string;
}
    const LangaugeTexts : Record<string, LanguageTexts>= {
        En: {
            welcomeText: "Welcome to the app. Sign up to continue",
            email: "Email",
            username: "Username",
            password: "Password", 
            signup: "Sign up",
            switchText: "Have an account? ",
            clickHere: "Click Here."
        },
        De: {
            welcomeText: "Willkommen in der App. Registrieren Sie sich, um fortzufahren",
            email: "E-Mail",
            username: "Benutzername",
            password: "Passwort",
            signup: "Registrieren",
            switchText: "Sie haben bereits ein Konto? ",
            clickHere: "Hier klicken."
  }
    }

    return (
        <div>
        
        <br/>

        <select 
        value={user.appLanguage}
        onChange={(e) => setUser({...user, appLanguage: e.target.value})}>
            <option value={'En'}>En</option>
            <option value={'De'}>De</option>
        </select>

        <br/><br/>
        <h1>{LangaugeTexts[user.appLanguage].welcomeText}</h1>
        
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

        <label htmlFor="username">{LangaugeTexts[user.appLanguage].username}</label>
        <br/>
        <input 
        type="text"
        placeholder={LangaugeTexts[user.appLanguage].username}
        id="username"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}/>

        <br/><br/>

        <label htmlFor="password">{LangaugeTexts[user.appLanguage].password}</label>
        <br/>
        <input 
        type="password"
        placeholder={LangaugeTexts[user.appLanguage].password}
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}/>

        <br/><br/>

        <button disabled={buttonDisabled} onClick={() => {handleSignupClick()}}>{LangaugeTexts[user.appLanguage].signup}</button>

        <br/>
        <span>{LangaugeTexts[user.appLanguage].switchText}</span>
        <Link href="/login">{LangaugeTexts[user.appLanguage].clickHere}</Link>

        <br/><br/>
        <div>Continue via Google</div>
        <div>Continue via GitHub</div>

        <br/>
        {isLoading ? <h1>Loading...</h1>: <></>}
        </div>
    )
}