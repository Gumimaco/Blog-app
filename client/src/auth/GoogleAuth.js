import React from 'react'
import googleLogo from '../images/googleLogo.png'

function GoogleAuth() {

    const googleLogin = () => {
        window.open("http://localhost:3001/api/auth/google","_self")
    }

    return (
        <div>
            <div onClick={googleLogin} className="bg-[#4285F4] h-8 border-2 rounded-sm flex border-[#4285F4] justify-between cursor-pointer text-sm font-roboto">
                <img className="max-w-1/4 p-1.5 ml-0.5 bg-white rounded-sm" src={googleLogo} alt="Google image"/>
                <p className="mx-2 self-center text-white">Login with Google</p>
            </div>
        </div>
    )
}

export default GoogleAuth
