
import Link from "next/link"

export default function Signup () {
    return (
        <div>
        <h1>Welcome to the app. Sign up to continue ...</h1>
        
        <br/>

        <label htmlFor="email">Email</label>
        <br/>
        <input 
        type="email"
        placeholder="Email"
        id="email"/>

        <br/><br/>

        <label htmlFor="email">Username</label>
        <br/>
        <input 
        type="text"
        placeholder="Username"
        id="uesrname"/>

        <br/><br/>

        <label htmlFor="email">Password</label>
        <br/>
        <input 
        type="password"
        placeholder="Password"
        id="password"/>

        <br/><br/>

        <button>Sign up</button>

        <br/>
        <span>Have an account?</span>
        <Link href="/login"> Click here.</Link>

        <br/><br/>
        <div>Continue via Google</div>
        <div>Continue via GitHub</div>
        </div>
    )
}