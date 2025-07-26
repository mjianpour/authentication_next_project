"use client"

import React, {useState, useEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParams } from 'next/navigation';

export default function ProfileInfo() {

    const countriesString = `Germany,Canada,New Zealand,Oman`

    const countries = countriesString.split(",");

    const [buttonDisabled, setButtonDisabled] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const params = useParams();

    const [userInfo, setUserInfo] = useState({
        username: params.id, 
        firstName: "",
        lastName: "",
        displayName: "", 
        gender: "",
        dateOfBirth: "",
        country: "",
        isProfileEdited: false
    })

    useEffect(() => {
        if(!(
            userInfo.firstName.length > 0 &&
            userInfo.lastName.length > 0 &&
            userInfo.displayName.length > 0 && 
            userInfo.gender.length > 0 &&
            userInfo.dateOfBirth.length > 0 &&
            userInfo.country.length > 0
        )) {
            setButtonDisabled(false)
            setUserInfo({...userInfo, isProfileEdited: true})
        }

    }, [
        userInfo.firstName,
        userInfo.lastName,
        userInfo.displayName, 
        userInfo.gender,
        userInfo.dateOfBirth,
        userInfo.country
    ])

    const router = useRouter();

    async function handleSubmitClick () {
        try {
            setIsLoading(true)
            console.log(userInfo.username)
            const response = await axios.put(`/api/profileinfo`, userInfo)
            console.log(response)
            router.push(`/home`)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmitClick();
            }}>
                <h1>Let me introduce you more</h1><br/>
                <input value={userInfo.firstName} type="text" placeholder="First Name" onChange={(e) => setUserInfo({...userInfo, firstName: e.target.value})}/>
                <br/>
                <input value={userInfo.lastName} type="text" placeholder="Last Name" onChange={(e) => setUserInfo({...userInfo, lastName: e.target.value})}/>
                <br/>
                <input value={userInfo.displayName} type="text" placeholder="Display Name" onChange={(e) => setUserInfo({...userInfo, displayName: e.target.value})}/>
                <br/><br/>
                
                <input type="radio" id="male" name="gender" value="male" 
                checked={userInfo.gender === "male"}
                onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}/>
                <label htmlFor="male">Male</label>
                <br/>

                <input type="radio" id="female" name="gender" value="female" 
                checked={userInfo.gender === "female"}
                onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}/>
                <label htmlFor="female">Female</label>
                <br/>

                <input type="radio" id="not to say" name="gender" value="prefer not to say" 
                checked={userInfo.gender === "prefer not to say"}
                onChange={(e) => setUserInfo({...userInfo, gender: e.target.value})}/>
                <label htmlFor="not to say">Prefer not to say</label>
                <br/><br/>

                <label htmlFor="dateOfBirth">Data of birth</label><br/>
                <input type="date" id="dateOfBirth" 
                value={userInfo.dateOfBirth}
                onChange={(e) => setUserInfo({...userInfo, dateOfBirth: e.target.value})}/>
                <br/><br/>

                <select value={userInfo.country} onChange={(e) => setUserInfo({...userInfo, country: e.target.value})}>
                    <option value="">Select your country</option>
                    {countries.map((countryOpt, index) => (<option key={index} value={countryOpt}>{countryOpt}</option>))}
                </select><br/><br/>

                <button disabled={buttonDisabled}>Submit</button><br/><br/>

                {isLoading ? <h1>Processing ...</h1>: <></>}

            </form><br/>
        </div>
    )
}