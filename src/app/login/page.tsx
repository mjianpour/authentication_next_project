
import Link from "next/link"

export default function Signup () {
    return (
        <div>
        <h1>Welcome, Login to continue ...</h1>
        
        <br/>

        <label htmlFor="useremail">Username or Email</label>
        <br/>
        <input 
        type="text"
        placeholder="Username or Email"
        id="uesrmail"/>

        <br/><br/>

        <label htmlFor="email">Password</label>
        <br/>
        <input 
        type="password"
        placeholder="Password"
        id="password"/>

        <br/><br/>

        <button>Login</button>

        <br/>
        <span>Don't Have an account?</span>
        <Link href="/signup"> Click here.</Link>

        <br/><br/>
        <div>Continue via Google</div>
        <div>Continue via GitHub</div>
        </div>
    )
}