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

    const [pageLan, setPageLan] = useState('En')


    interface LanguageTexts {
        welcomeText: string;
        username: string;
        password: string;
        login: string;
        switchText: string;
        clickHere: string;
}
    const LangaugeTexts : Record<string, LanguageTexts>= {
        En: {
            welcomeText: "Welcome, Login to continue",
            username: "Username",
            password: "Password", 
            login: "Login",
            switchText: "Don't have an account? ",
            clickHere: "Click Here."
        },
        De: {
            welcomeText: "Willkommen, melden Sie sich an, um fortzufahren",
            username: "Benutzername",
            password: "Passwort",
            login: "Anmelden",
            switchText: "Sie haben noch kein Konto? ",
            clickHere: "Hier klicken."
        }
    }

    return (
        <div>

        <br/>

        <select value={pageLan}
        onChange={(e) => setPageLan(e.target.value)}>
            <option value='En'>En</option>
            <option value='De'>De</option>
        </select>

        <br/><br/>
        <h1>{LangaugeTexts[pageLan].welcomeText}</h1>
        
        <br/>

        <label htmlFor="useremail">{LangaugeTexts[pageLan].username}</label>
        <br/>
        <input 
        type="text"
        placeholder={LangaugeTexts[pageLan].username}
        id="usermail"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}/>

        <br/><br/>

        <label htmlFor="email">{LangaugeTexts[pageLan].password}</label>
        <br/>
        <input 
        type="password"
        placeholder={LangaugeTexts[pageLan].password}
        id="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}/>

        <br/><br/>

        <button disabled={buttonDisabled} onClick={() => {handleLoginClick()}}>{LangaugeTexts[pageLan].login}</button>

        <br/>
        <span>{LangaugeTexts[pageLan].switchText}</span>
        <Link href="/signup">{LangaugeTexts[pageLan].clickHere}</Link>

        <br/><br/>
        <div>Continue via Google</div>
        <div>Continue via GitHub</div>

        <br/>
        {isLoading ? <h1>Loading...</h1>: <></>}
        </div>
    )
}